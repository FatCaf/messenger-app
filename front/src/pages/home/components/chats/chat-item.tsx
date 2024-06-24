import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../../../components/user-avatar';
import { AppRoute } from '../../../../enums/app-route';
import { User } from '../../../../types/types';

type ChatIteProps = {
  id: string;
  userId: string;
  interlocutor: User;
  lastMessage: string;
  lastMessageTimeStamp: string;
  setChatClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatItem: FC<ChatIteProps> = ({
  id,
  userId,
  interlocutor,
  lastMessage,
  lastMessageTimeStamp,
  setChatClicked
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setChatClicked(true);
    navigate(`${AppRoute.CHATS}/${id}/${userId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') handleClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex justify-between items-center w-full p-2 cursor-pointer bg-slate-800"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col justify-between items-start">
        <p>{interlocutor.name}</p>
        <p className='whitespace-normal'>{lastMessage}</p>
        <p className="italic">{lastMessageTimeStamp}</p>
      </div>
      <UserAvatar name={interlocutor.name} />
    </div>
  );
};

export default ChatItem;
