'use client';
import { io } from 'socket.io-client';
import { API_BASE_URI } from './TranslationApi';

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

const socket = io(`wws://${API_BASE_URI}` || 'http://localhost:3001');
let isConnected = false;


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
    if (isConnected) {
      console.log('already connected');
      return;
    }
    isConnected = true;
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
    console.log('sending message', msg);
    socket.emit('sendMessage', msg, errorHandler);
}

const sendTranslation = (text: string, sourceLang: string, targetLang: string, errorHandler: ErrorHandler) => {
    // Emit "translate" event with text, source language, and target language
    console.log('sending translation', text, sourceLang, targetLang);
    socket.emit('translate', text, sourceLang, targetLang, errorHandler);
}

export const chatApi = {
  connect,
  disconnect,
  sendMessage,
  sendTranslation,
};