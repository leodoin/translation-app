// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Server, Socket } from 'socket.io';
import {getRoomFromCache, addMessageToCache} from '../services/cache-service';
import {addUser, getUser, deleteUser} from '../services/users-service';
import { translateText } from '../services/translation-service';


export const onIOConnection = (io:Server, socket:Socket) => {
  // Add listener for "signin" event
  console.log('onIOConnection');
  socket.on('signin', async ({userId, roomId}, callback) => {
    console.log('signin', userId, roomId);
    try {
      // Record socket ID to user's name and chat room
      addUser(socket.id, userId, roomId);
      // Call join to subscribe the socket to a given channel
      socket.join(roomId);
      // Emit notification event  
      socket.in(roomId).emit('notification', {
        title: "Someone's here",
        description: `${userId} just entered the room`,
      });
      // Retrieve room's message history or return null
      const messages = await getRoomFromCache(roomId);
      // Use the callback to respond with the room's message history
      // Callbacks are more commonly used for event listeners than promises
      callback(null, messages);
    } catch (err) {
      callback(err, null);
    }
  });

  // [START cloudrun_websockets_update_socket]
  // Add listener for "updateSocketId" event
  socket.on('updateSocketId', async ({user, room}) => {
    try {
      addUser(socket.id, user, room);
      socket.join(room);
    } catch (err) {
      console.error(err);
    }
  });
  // [END cloudrun_websockets_update_socket]

  // Add listener for "sendMessage" event
  socket.on('sendMessage', (message:string, callback) => {
    // Retrieve user's name and chat room  from socket ID
    console.log('sendMessage', message);
    const user = getUser(socket.id);
    if(!user?.roomId) { return; }
    const {userId, roomId} = user;
    if(!roomId) { callback('User session not found.'); }
      const msg = {userId, text: message};
      // Push message to clients in chat room
      io.in(roomId).emit('message', msg);
  });

  socket.on('translate', (text, sourceLang, targetLang, callback) => {
    console.log('translate', text, sourceLang, targetLang);
    const user = getUser(socket.id);
    if(!user?.roomId) { return; }
    const {userId, roomId} = user;
    translateText(text, sourceLang, targetLang)
    .then(translation => {
      io.in(roomId).emit('translation', {
        userId,
        text,
        sourceLang,
        targetLang,
        translation,
      });
    })
    .catch(err => {
      console.error(err)
      callback(err.message);
    });
  });

  // Add listener for disconnection
  socket.on('disconnect', () => {
    // Remove socket ID from list
    console.log('disconnect');
    const user = deleteUser(socket.id);
    if(!user) { return; }
    const {userId, roomId} = user;
    io.in(roomId).emit('notification', {
      title: 'Someone just left',
      description: `${userId} just left the room`,
    });
  });
};