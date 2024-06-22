import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserAvatar from '../../components/user-avatar';
import { User } from '../../types/user';
import Chat from './components/chat/chat';
import Chats from './components/chats/chats';
import Contacts from './components/contacts/contacts';

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
      <aside className="h-dvh w-2/6 border-r-2">
        <div className="flex justify-between items-center border-b-2 p-2">
          <p className="w-4/5">{user && user.name}</p>
          <UserAvatar name={`${user && user.name}`} />
        </div>
        <div className="flex justify-between items-center border-b-2">
          <button
            type="button"
            className="p-1 w-1/2 bg-green-500"
            onClick={(): void => setCurrentTab('chats')}
          >
            Chats
          </button>
          <button
            type="button"
            className="p-1 w-1/2 bg-yellow-500"
            onClick={(): void => setCurrentTab('contacts')}
          >
            Contacts
          </button>
        </div>
        <div className="flex flex-col items-start justify-center gap-2 p-1">
          {currentTab === 'contacts' && (
            <Contacts id={user?.id || ''} setChatClicked={setChatClicked} />
          )}
          {currentTab === 'chats' && (
            <Chats id={user?.id || ''} setChatClicked={setChatClicked} />
          )}
        </div>
      </aside>
      {chatClicked && location.pathname !== '/chats' ? (
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
