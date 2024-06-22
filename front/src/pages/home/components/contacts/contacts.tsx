/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useEffect, useState } from 'react';
import { getContacts } from '../../../../api/requests/get-contacts';
import { ContactsResponseDto } from '../../../../types/types';
import ContactItem from './contact-item';

type ContactsProps = {
  id: string;
  setChatClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const Contacts: FC<ContactsProps> = ({ id, setChatClicked }) => {
  const [contacts, setContacts] = useState<ContactsResponseDto | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getContacts(id);
        setContacts(data);
      })();
    }
  }, [id]);

  return (
    <>
      {contacts &&
        contacts.users.map((contact) => (
          <ContactItem
            key={contact.id}
            name={contact.name}
            email={contact.email}
            contactId={contact.id}
            userId={id}
            setChatClicked={setChatClicked}
          />
        ))}
    </>
  );
};

export default Contacts;
