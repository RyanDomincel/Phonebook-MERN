import React, { createContext, useState } from "react";
import {
  getContacts,
  addContact,
  deleteContact as deleteContactService,
} from "../services/contactService";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch contacts from the API
  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      setError("Failed to fetch contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new contact to the API
  const createContact = async (contact) => {
    setLoading(true);
    setError(null);
    try {
      const newContact = await addContact(contact);
      setContacts((prevContacts) => [...prevContacts, newContact]);
    } catch (error) {
      setError("Failed to add contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact from the API
  const deleteContact = async (contactId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteContactService(contactId); // Assuming this function deletes from the database
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== contactId)
      );
    } catch (error) {
      setError("Failed to delete contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        loading,
        error,
        fetchContacts,
        createContact,
        deleteContact, // Provide the deleteContact function
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
