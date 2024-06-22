import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../../../../api/requests/create-chat';
import UserAvatar from '../../../../components/user-avatar';
import { AppRoute } from '../../../../enums/app-route';

type ContactItemProps = {
  userId: string;
  contactId: string;
  name: string;
  email: string;
  setChatClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactItem: FC<ContactItemProps> = ({
  name,
  email,
  contactId,
  userId,
  setChatClicked
}) => {
  const navigate = useNavigate();

  const handleClick = async (): Promise<void> => {
    const participants = [userId, contactId] as [string, string];

    const { id } = await createChat({ participants });

    setChatClicked(true);
    navigate(`${AppRoute.CHATS}/${id}/${userId}`);
  };

  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLDivElement>
  ): Promise<void> => {
    if (e.code === 'Enter') {
      handleClick();
    }
  };
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex justify-between items-center border-[2px] w-full p-2 cursor-pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex flex-col justify-between items-start">
        <p>{name}</p>
        <p className="italic">{email}</p>
      </div>
      <UserAvatar name={name} />
    </div>
  );
};

export default ContactItem;
