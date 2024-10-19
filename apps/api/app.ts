import express from 'express';
import { translationApi } from './src/apis/translation-api';
import { helloWorldApi } from './src/apis/hello-world-api';
import cors from 'cors';
import http from 'http';

import { Redis } from "ioredis";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { onIOConnection } from './src/apis/chat-api';


const pubClient = new Redis({
  host: process.env.REDISHOST || 'localhost',
  port: parseInt(process.env.REDISPORT || '6379'),
});

const subClient = pubClient.duplicate();

pubClient.on('connect', () => {
  console.log('Publisher Redis client connected: '+process.env.REDISHOST+':'+process.env.REDISPORT);
});

pubClient.on('error', (err) => {
  console.error('Publisher Redis client error:', err);
});

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', helloWorldApi)

app.post('/api/translation', translationApi)

const port = parseInt(process.env.PORT || '8080')


const server = app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})

//bind socket.io to the http server
const io = new Server(server, {
  adapter: createAdapter(pubClient, subClient),
  cors: {origin: '*'}
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  onIOConnection(io, socket);
});

io.on('error', (err) => {console.error('Socket.io error:', err)});


export default app;