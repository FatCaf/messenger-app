export class MessageSendDto {
	constructor(
		readonly senderId: string,
		readonly text: string,
		readonly attachments: string[]
	) {}
}
