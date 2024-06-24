import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuButton from './menu-button';

type MenuProps = {
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

const Menu: FC<MenuProps> = ({ setCurrentTab }) => {
  const navigate = useNavigate();
  const handleClick = (value: string) => {
    switch (value) {
      case 'chats':
        setCurrentTab(value);
        break;
      case 'contacts':
        setCurrentTab(value);
        break;
      case 'logout':
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        break;
      default:
        break;
    }
  };
  return (
    <div className="flex justify-between items-center mb-5">
      <MenuButton
        handleClick={handleClick}
        label="Chats"
        bgColor="bg-emerald-500"
      />
      <MenuButton
        handleClick={handleClick}
        label="Contacts"
        bgColor="bg-amber-500"
      />
      <MenuButton
        handleClick={handleClick}
        label="Logout"
        bgColor="bg-red-500"
      />
    </div>
  );
};

export default Menu;
