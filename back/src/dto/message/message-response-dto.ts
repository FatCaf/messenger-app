export class MessageResponseDto {
	constructor(
		readonly messageId: string,
		readonly senderId: string,
		readonly text: string,
		readonly timestamp: Date,
		readonly attachments: string[]
	) {}
}
