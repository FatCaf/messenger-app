export class MessageSendDto {
	constructor(
		readonly chatId: string,
		readonly senderId: string,
		readonly text: string,
		readonly attachments: string[]
	) {}
}
