import React, { useContext, useEffect } from "react";
import { ContactContext } from "../../context/ContactContext";

const ContactList = () => {
  const { contacts, fetchContacts } = useContext(ContactContext);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.firstName} {contact.lastName} - {contact.contactNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
