import React, { createContext, useState } from "react";
import { getContacts, addContact } from "../services/contactService";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const data = await getContacts();
    setContacts(data);
  };

  const createContact = async (contact) => {
    const newContact = await addContact(contact);
    setContacts([...contacts, newContact]);
  };

  return (
    <ContactContext.Provider value={{ contacts, fetchContacts, createContact }}>
      {children}
    </ContactContext.Provider>
  );
};
