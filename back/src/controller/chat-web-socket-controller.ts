import jwt from 'jsonwebtoken';
import { Buffer } from 'node:buffer';
import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';
import { WebSocket, WebSocketServer } from 'ws';
import { MessageSendDto } from '../dto/dto';
import { JWT_SECRET } from '../helpers/get-envs';
import { chatService, errorService } from '../service/service';
class ChatWebSocketController {
	constructor(private wsServer: WebSocketServer) {}

	authenticateWebSocket(ws: WebSocket, request: IncomingMessage): boolean {
		const url = new URL(request.url!, `http://${request.headers.host}`);
		const token = url.searchParams.get('token');
		if (!token || !JWT_SECRET) {
			return false;
		}

		try {
			jwt.verify(token, JWT_SECRET);
			return true;
		} catch (error) {
			if (error instanceof Error) {
				const { statusCode, message } =
					errorService.createWebsocketError(error);
				if (ws.readyState === WebSocket.OPEN) {
					ws.send(
						JSON.stringify({
							type: 'error',
							data: { statusCode, message },
						})
					);
				}
			}
			return false;
		}
	}

	handleUpgrade(request: IncomingMessage, socket: Socket, head: Buffer) {
		console.log('qwe');
		this.wsServer.handleUpgrade(request, socket, head, (ws) => {
			if (!this.authenticateWebSocket(ws, request)) {
				ws.close(1008, 'Unauthorized');
				return;
			}

			this.wsServer.emit('connection', ws, request);
		});
	}

	setup() {
		this.wsServer.on('connection', (ws, request) => {
			const pathname = request.url?.split('?');

			if (pathname && pathname[0].includes('/api/v1/chat')) {
				console.log('Chat client connected');

				ws.on('message', async (message) => {
					try {
						const messageDto: MessageSendDto = JSON.parse(message.toString());
						const newMessage = await chatService.edit(messageDto);
						console.log(messageDto);
						const updatedChatMessage = JSON.stringify({
							type: 'chatUpdate',
							data: newMessage,
						});

						this.wsServer.clients.forEach((client) => {
							if (client.readyState === WebSocket.OPEN) {
								client.send(updatedChatMessage);
							}
						});
					} catch (error) {
						if (error instanceof Error) {
							const { statusCode, message } =
								errorService.createWebsocketError(error);
							if (ws.readyState === WebSocket.OPEN) {
								ws.send(
									JSON.stringify({
										type: 'error',
										data: { statusCode, message },
									})
								);
							}
						}
					}
				});

				ws.on('close', () => {
					console.log('Chat client disconnected');
				});
			} else {
				ws.close();
			}
		});
	}
}

export default ChatWebSocketController;
