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

// Local record of users
const users:Map<string,User> = new Map();

type User = {
    userId: string;
    roomId: string;
}

// Record socket ID with user's name and chat room
function addUser(id:string,userId:string, roomId:string):void|Error {
  if (!userId && !roomId) return new Error('Username and room are required');
  if (!userId) return new Error('Username is required');
  if (!roomId) return new Error('Room is required');
  console.log('addUser', id, userId, roomId);
  console.log(users)
  users.set(id, {userId, roomId});
}

// Return user's name and chat room from socket ID
function getUser(id:string): User|undefined {
  console.log(users)
  return users.get(id);
}

// Delete user record
function deleteUser(id:string):User|undefined {
  const user = getUser(id);
  users.delete(id);
  return user
}

export {
  addUser,
  getUser,
  deleteUser,
};
