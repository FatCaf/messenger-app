import { FC, useEffect, useState } from 'react';
import { getContacts } from '../../../../api/requests/get-contacts';
import { ContactsResponseDto } from '../../../../types/types';
import ContactItem from './contact-item';

type ContactsProps = {
  id: string;
};

const Contacts: FC<ContactsProps> = ({ id }) => {
  const [contacts, setContacts] = useState<ContactsResponseDto | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getContacts(id);
      setContacts(data);
    })();
  }, [id]);

  return (
    <div className="flex flex-col items-start justify-center gap-2 p-1">
      {contacts &&
        contacts.users.map((contact) => (
          <ContactItem
            key={contact.id}
            name={contact.name}
            email={contact.email}
          />
        ))}
    </div>
  );
};

export default Contacts;
