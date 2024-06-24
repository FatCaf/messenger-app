import React, { FC, useEffect, useState } from 'react';
import { getChats } from '../../../../api/requests/requests';
import { ChatsResponseDto } from '../../../../types/types';
import {
  processLastMessage,
  processLastMessageTimestamp
} from '../../../../utils/process-last-message';
import ChatItem from './chat-item';

type ChatProps = {
  id: string;
  setChatClicked: React.Dispatch<React.SetStateAction<boolean>>;
};
/* eslint-disable react/jsx-no-useless-fragment */
const Chats: FC<ChatProps> = ({ id, setChatClicked }) => {
  const [chats, setChats] = useState<ChatsResponseDto[] | []>([]);

  useEffect(() => {
    (async () => {
      const data = await getChats(id);
      setChats(data);
    })();
  }, [id]);

  return (
    <>
      {chats &&
        chats.map((chat) => (
          <ChatItem
            key={chat.id}
            id={chat.id}
            userId={id}
            interlocutor={chat.interlocutor}
            lastMessage={processLastMessage(chat.lastMessage)}
            lastMessageTimeStamp={processLastMessageTimestamp(
              chat.lastMessageTimeStamp
            )}
            setChatClicked={setChatClicked}
          />
        ))}
    </>
  );
};

export default Chats;
