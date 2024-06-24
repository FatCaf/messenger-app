import { FC } from 'react';

type UserAvatarProps = {
  name: string;
};
const UserAvatar: FC<UserAvatarProps> = ({ name }) => (
  <div className="rounded-[50%] w-[40px] h-[40px] p-1 flex justify-center items-center text-black bg-indigo-500">
    {name && name.slice(0, 2).toUpperCase()}
  </div>
);

export default UserAvatar;
