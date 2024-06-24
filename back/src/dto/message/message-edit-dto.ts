export class MessageEditDto {
	constructor(
		readonly chatId: string,
		readonly messageId: string,
		readonly text: string
	) {}
}
