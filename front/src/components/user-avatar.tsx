import { FC, useRef } from 'react';
import generateRandomHexColor from '../utils/generate-random-color';

type UserAvatarProps = {
  name: string;
};
const UserAvatar: FC<UserAvatarProps> = ({ name }) => {
  const color = useRef(generateRandomHexColor());

  return (
    <div
      style={{ backgroundColor: color.current }}
      className="rounded-[50%] w-[40px] h-[40px] p-1 flex justify-center items-center"
    >
      {name && name.slice(0, 2).toUpperCase()}
    </div>
  );
};

export default UserAvatar;
