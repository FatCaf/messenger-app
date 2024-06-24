import { FC } from 'react';

type MenuButtonProps = {
  handleClick: (value: string) => void;
  label: string;
  bgColor: string;
};
const MenuButton: FC<MenuButtonProps> = ({ handleClick, label, bgColor }) => (
  <button
    type="button"
    className={`p-1 w-1/3 text-slate-300 ${bgColor}`}
    onClick={(): void => handleClick(label.toLowerCase())}
  >
    {label}
  </button>
);

export default MenuButton;
