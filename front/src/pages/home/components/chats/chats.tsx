import React, { FC, useEffect, useState } from 'react';
import { getChats } from '../../../../api/requests/get-chats';
import { ChatsResponseDto } from '../../../../types/chats-response-dto';
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
            lastMessage={chat.lastMessage || ''}
            lastMessageTimeStamp={
              chat?.lastMessageTimeStamp?.toDateString() || ''
            }
            setChatClicked={setChatClicked}
          />
        ))}
    </>
  );
};

export default Chats;
