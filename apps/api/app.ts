import express from 'express';
import { translationApi } from './src/apis/translation-api';
import { helloWorldApi } from './src/apis/hello-world-api';
import cors from 'cors';

import { Redis } from "ioredis";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { onIOConnection } from './src/apis/chat-api';


const pubClient = new Redis({
  host: process.env.REDISHOST || 'localhost',
  port: parseInt(process.env.REDISPORT || '6379'),
});
const subClient = pubClient.duplicate();

const io = new Server({
  adapter: createAdapter(pubClient, subClient),
  cors: {origin: '*'}
});

const app = express()

const port = parseInt(process.env.PORT || '8080')

app.use(express.json())

app.use(cors())

io.listen(3001);

console.log('Socket.io listening on port 3001');

io.on('connection', (socket) => {
  onIOConnection(io, socket);
});


app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`)
})

app.get('/', helloWorldApi)

app.post('/api/translation', translationApi)


export default app;