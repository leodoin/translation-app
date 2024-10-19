'use client';
import { io } from 'socket.io-client';
import nextConfig from '../../../next.config.mjs';

type ErrorHandler = (errorMsg: string) => void;

type Notification = {
  title: string;
  description: string;
}
type Message = {
  userId: string;
  text: string;
}
type MessageHandler = (message:Message) => void;
type NotificationHandler = (notification:Notification) => void;
type TranslationHandler = (translation:Translation) => void;

type Translation = {
  userId: string;
  text: string;
  sourceLang: string;
  targetLang: string;
  translation: string;
}

type ConnectionParams = {
  userId: string;
  roomId: string;
  messageHandler: MessageHandler;
  notificationHandler: NotificationHandler;
  translateHandler: TranslationHandler;
  errorHandler: ErrorHandler;
}




// const socket = io("https://translations-service-332538335160.europe-west4.run.app",{
  const socket = io("http://localhost:8080", { 
    
  transports: ["websocket"],
  autoConnect: false,
});


const connect = ({
  userId, 
  roomId, 
  messageHandler, 
  notificationHandler, 
  translateHandler,
  errorHandler
}: ConnectionParams) => {
  // Initialize Socket.io
    // Emit "join" event with chat room
    console.log('connecting to chat room', roomId); 
    if (socket.connected) {
      console.log('already connected');
      return;
    }

    socket.connect();

    socket.emit('signin', {userId, roomId}, errorHandler);
    socket.on('message', messageHandler);
    socket.on('notification', notificationHandler);
    socket.on('translation', translateHandler);
    socket.io.on('reconnect', () => {
      console.log('reconnected');
      // Emit "updateSocketId" event to update the recorded socket ID with user and room
      socket.emit('updateSocketId', {userId, roomId}, errorHandler);
    });
}
const disconnect = (errorHandler: ErrorHandler) => {
    // Emit "leave" event
    socket.emit('disconnect', errorHandler);
    socket.off('message');
    socket.off('notification');
    socket.off('reconnect');
}

const sendMessage = (msg: string, errorHandler: ErrorHandler) => {
    // Emit "sendMessage" event with message
    console.debug('sending message', msg);
    socket.emit('sendMessage', msg, errorHandler);
}

const sendTranslation = (text: string, sourceLang: string, targetLang: string, errorHandler: ErrorHandler) => {
    // Emit "translate" event with text, source language, and target language
    console.debug('translating', text)
    socket.emit('translate', text, sourceLang, targetLang, errorHandler);
}

export const chatApi = {
  connect,
  disconnect,
  sendMessage,
  sendTranslation,
};