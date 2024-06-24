import { FC } from 'react';
import UserAvatar from '../../../components/user-avatar';

type UserInfoProps = {
  name: string;
};

const UserInfo: FC<UserInfoProps> = ({ name }) => (
  <div className="flex justify-between items-center p-2 w-full">
    <p className="w-4/5">{name}</p>
    <UserAvatar name={name} />
  </div>
);

export default UserInfo;
