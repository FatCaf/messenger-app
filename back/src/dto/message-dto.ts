export class MessageDto {
	constructor(
		readonly senderId: string,
		readonly text: string,
		readonly timestamp: Date,
		readonly attachments: string[]
	) {}
}
