import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../../types/user/user';
import Chat from './components/chat/chat';
import Chats from './components/chats/chats';
import Contacts from './components/contacts/contacts';
import Menu from './components/menu/menu';
import UserInfo from './components/user-info';

const Home: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState('contacts');
  const [chatClicked, setChatClicked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const data: User = JSON.parse(localStorage.getItem('user') as string);

    setUser(data);
  }, []);

  return (
    <section className="flex justify-center items-center w-full">
      <aside className="h-dvh w-2/6 border-r-2 border-slate-500">
        <UserInfo name={user?.name || ''} />
        <Menu setCurrentTab={setCurrentTab} />
        <div className="flex flex-col items-start justify-center gap-2">
          {!chatClicked && currentTab === 'contacts' && (
            <Contacts id={user?.id || ''} setChatClicked={setChatClicked} />
          )}
          {currentTab === 'chats' && (
            <Chats id={user?.id || ''} setChatClicked={setChatClicked} />
          )}
        </div>
      </aside>
      {chatClicked || location.pathname !== '/chats' ? (
        <Chat />
      ) : (
        <div className="w-2/3 flex justify-center items-center">
          <p className="text-3xl">Start messaging to someone!</p>
        </div>
      )}
    </section>
  );
};

export default Home;
