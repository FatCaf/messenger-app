import jwt from 'jsonwebtoken';
import { Buffer } from 'node:buffer';
import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';
import { WebSocket, WebSocketServer } from 'ws';
import { JWT_SECRET } from '../../helpers/get-envs';
import { chatService, errorService } from '../../service/service';
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
		this.wsServer.handleUpgrade(request, socket, head, (ws) => {
			if (!this.authenticateWebSocket(ws, request)) {
				ws.close(1008, 'Unauthorized');
				return;
			}

			this.wsServer.emit('connection', ws, request);
		});
	}

	setup() {
		this.wsServer.on('connection', (ws, request: IncomingMessage) => {
			const url = new URL(request.url!, `http://${request.headers.host}`);
			const pathname = url.pathname;

			if (pathname.includes('/api/v1/chat')) {
				console.log('Chat client connected');

				ws.on('message', async (message) => {
					try {
						const messageDto = JSON.parse(message.toString());

						const { action } = messageDto;
						let data;
						let type;
						switch (action) {
							case 'edit':
								type = 'edited';
								data = await chatService.editMessage(messageDto);
								break;
							case 'delete':
								data = await chatService.deleteMessage(messageDto);
								type = 'deleted';
								break;
							case 'send':
								type = 'sended';
								data = await chatService.sendMessage(messageDto);
								break;
							default:
								break;
						}

						const updatedChatMessage = JSON.stringify({
							type,
							data,
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
