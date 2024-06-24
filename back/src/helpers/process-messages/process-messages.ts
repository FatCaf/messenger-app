import { MessageDto, MessageResponseDto } from '../../dto/dto';

const processMessages = (
	messages: MessageDto[] | undefined
): MessageResponseDto[] => {
	return (
		messages?.map((msg) => ({
			...msg,
			timestamp: msg.timestamp.toDate(),
		})) || []
	);
};

export { processMessages };
