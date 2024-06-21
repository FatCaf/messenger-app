import { FC, useState } from 'react';
import UserAvatar from '../../../../components/user-avatar';

type ContactItemProps = {
  name: string;
  email: string;
};

const ContactItem: FC<ContactItemProps> = ({ name, email }) => {
  const [contactClicked, setContactClicked] = useState(false);
  console.log(contactClicked);
  return (
    <div
      role="button"
      tabIndex={0}
      className="flex justify-between items-center border-[2px] w-full p-2 cursor-pointer"
      onClick={(): void => setContactClicked(true)}
      onKeyDown={(): void => setContactClicked(true)}
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
