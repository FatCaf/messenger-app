import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChat } from '../../../../api/requests/get-chat';
import useWebSocket from '../../../../hooks/useWebsoket';
import { ChatType } from '../../../../types/chat';
import { Message } from '../../../../types/message';
import { MessageResponseDto } from '../../../../types/message-response-dto';
import Msg from './message';

const Chat: FC = () => {
  const [chat, setChat] = useState<ChatType | null>(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const { id, userId } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleMessage = useCallback(
    async (event: MessageEvent): Promise<void> => {
      const messageData: MessageResponseDto = JSON.parse(event.data);

      setChat((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          messages: [...(prev.messages || []), messageData.data]
        };
      });
    },
    []
  );

  const { sendMessage } = useWebSocket(
    `${import.meta.env.VITE_API_WEBSOCKET}/chat?token=${token}`,
    handleMessage
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (id && message) {
      const messageDto: Partial<Message> & { chatId: string } = {
        chatId: id,
        senderId: userId,
        text: message,
        attachments: []
      };
      sendMessage(JSON.stringify(messageDto));
      setMessage('');
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getChat(id);
        setChat(data);
      }
    })();
  }, [id]);

  return (
    <div className="w-2/3 flex flex-col justify-between items-center p-2">
      <div className="max-h-[90dvh] overflow-auto h-[90dvh] w-full">
        {(chat?.messages || []).map((msg) => (
          <Msg
            key={msg.text}
            text={msg.text}
            timestamp={msg.timestamp}
            attachments={msg.attachments}
            senderId={msg.senderId}
          />
        ))}
      </div>
      <div className="flex justify-center items-center w-full self-end">
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-between items-center"
        >
          <input
            type="text"
            placeholder="Enter your message here..."
            onChange={handleChange}
            value={message}
            className="rounded-[24px] p-2 w-10/12 border"
            name="message-field"
          />
          <button type="submit" className="rounded-[24px] p-2 border">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
