/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';

type ControlButtonProps = {
  icon: string;
  action: string;
  handleClick: (action: string) => void;
};
const ControlButton: FC<ControlButtonProps> = ({
  icon,
  action,
  handleClick
}) => (
  <button
    type="button"
    className={`border rounded-[50%] cursor-pointer w-[40px] h-[40px]
    flex justify-center items-center p-1 ${action === 'send' ? 'bg-green-400' : 'bg-red-400'}`}
    onClick={() => handleClick(action)}
  >
    <img src={icon} alt="control-button" width={20} height={20} />
  </button>
);

export default ControlButton;
