/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChat } from '../../../../api/requests/get-chat';
import { attachment } from '../../../../assets/assets';
import { Actions } from '../../../../enums/actions';
import useWebSocket from '../../../../hooks/useWebsoket';
import {
  ChatType,
  Message,
  MessageEditRequestDto,
  MessageResponseDto
} from '../../../../types/types';

import EditControls from '../../../../components/edit-controls';
import FilePreview from '../../../../components/file-preview';
import { encodeImageFileAsURL } from '../../../../utils/encode-image-to-url';
import UserInfo from '../user-info';
import Msg from './message';

const Chat: FC = () => {
  const [chat, setChat] = useState<ChatType | null>(null);
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [editMessageClicked, setEditMessageClicked] = useState(false);
  const token = localStorage.getItem('token');
  const { chatId, userId } = useParams();
  const [editMessageData, setEditMessageData] = useState<MessageEditRequestDto>(
    {
      action: 'edit',
      chatId: chatId as string,
      messageId: '',
      text: ''
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setEditMessageData((prev) => ({
      ...prev,
      text: e.target.value
    }));
  };

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      Promise.all(files.map((file) => encodeImageFileAsURL(file)))
        .then((base64Urls) => {
          setAttachments((prev) => [...prev, ...base64Urls]);
        })
        .catch((error) => {
          console.error('Error encoding files:', error);
        });
    }
  };

  const handleMessage = useCallback(
    async (event: MessageEvent): Promise<void> => {
      const { data, type } = JSON.parse(event.data) as MessageResponseDto;

      switch (type) {
        case Actions.DELETED:
        case Actions.EDITED:
          setChat((prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              messages: data
            };
          });
          break;
        default:
          setChat((prev) => {
            if (!prev) return prev;

            return {
              ...prev,
              messages: [...(prev.messages || []), data]
            };
          });
          break;
      }
    },
    []
  );

  const { sendMessage } = useWebSocket(
    `${import.meta.env.VITE_API_WEBSOCKET}/chat?token=${token}`,
    handleMessage
  );

  const handleDelete = (action: string, messageId: string) => {
    const messageDto = {
      action,
      chatId,
      messageId
    };

    sendMessage(JSON.stringify(messageDto));
  };

  const handleEditClick = (messageId: string, messageText: string) => {
    setEditMessageClicked(true);
    setMessage(messageText);
    setEditMessageData((prev) => ({
      ...prev,
      text: messageText,
      messageId
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatId && message) {
      const messageDto: Partial<Message> & { chatId: string; action: string } =
        {
          chatId,
          action: 'send',
          senderId: userId,
          text: message,
          attachments
        };
      sendMessage(JSON.stringify(messageDto));
      setMessage('');
      setAttachments([]);
    }
  };

  useEffect(() => {
    (async () => {
      if (chatId && userId) {
        const data = await getChat(chatId, userId);

        setChat(data);
      }
    })();
  }, [chatId, userId]);

  return (
    <div className="w-2/3 flex flex-col justify-between items-center p-2 h-dvh">
      <UserInfo name={chat?.interlocutor.name || ''} />
      <div className="max-h-[80dvh] overflow-auto h-[80dvh] w-full flex flex-col gap-3 pr-1">
        {(chat?.messages || []).map((msg) => (
          <Msg
            key={msg.timestamp}
            messageId={msg.messageId}
            text={msg.text}
            timestamp={msg.timestamp}
            attachments={msg.attachments}
            senderId={msg.senderId}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center w-full self-end gap-2">
        {attachments.length > 0 && <FilePreview attachments={attachments} />}
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-between items-center gap-2"
        >
          <div className="rounded-[24px] p-2 w-10/12 border relative">
            <input
              type="text"
              placeholder="Enter your message here..."
              onChange={handleChange}
              value={message}
              className="border-none outline-none bg-transparent w-full"
              name="message-field"
            />
            {editMessageClicked && (
              <EditControls
                setMessage={setMessage}
                setEditMessageClicked={setEditMessageClicked}
                sendMessage={sendMessage}
                data={editMessageData}
              />
            )}
          </div>
          <label
            htmlFor="file-upload"
            className="border rounded-[50%] cursor-pointer w-[40px] h-[40px]
          flex justify-center items-center p-1"
          >
            <img src={attachment} alt="attachment" width={20} height={20} />
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            multiple
            name="file-upload"
            className="hidden"
            onChange={handleAttachment}
            disabled={editMessageClicked}
          />
          <button
            type="submit"
            className="rounded-[24px] p-2 border w-2/12 bg-emerald-600 cursor-pointer"
            disabled={editMessageClicked}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
