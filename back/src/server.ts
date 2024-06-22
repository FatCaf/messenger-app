import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Socket } from 'node:net';
import { WebSocketServer } from 'ws';
import ChatWebSocketController from './controller/chat-web-socket-controller';
import { PORT } from './helpers/get-envs';
import { initRoutes } from './route/route';
const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);

const wsServer = new WebSocketServer({ noServer: true });

const chatWebSocketController = new ChatWebSocketController(wsServer);

server.on('upgrade', (request, socket: Socket, head) => {
	chatWebSocketController.handleUpgrade(request, socket, head);
});

chatWebSocketController.setup();

server.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});

initRoutes(app);
