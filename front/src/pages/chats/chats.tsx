import { FC, useEffect, useRef, useState } from 'react';
import { User } from '../../types/user';
import Contacts from './components/contacts/contacts';

const Chats: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState('');
  const userColor = useRef('red');
  useEffect(() => {
    const data: User = JSON.parse(localStorage.getItem('user') as string);

    setUser(data);
  }, []);

  return (
    <section className="flex justify-center items-center w-full">
      <aside className="h-dvh w-2/6 border-r-2">
        <div className="flex justify-between items-center border-b-2 p-2">
          <p className="w-4/5">{user && user.name}</p>
          <div
            style={{ backgroundColor: userColor.current }}
            className="rounded-[50%] w-[40px] h-[40px] p-1 flex justify-center items-center"
          >
            {user && user.name.slice(0, 2).toUpperCase()}
          </div>
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
        {currentTab === 'contacts' && <Contacts id={user?.id || ''} />}
      </aside>
      <div className="w-2/3">Chat</div>
    </section>
  );
};

export default Chats;
