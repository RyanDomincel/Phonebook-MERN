import React from "react";
import ContactList from "../components/Contacts/ContactList";
import ContactForm from "../components/Contacts/ContactForm";

const Phonebook = () => {
  return (
    <div>
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default Phonebook;
