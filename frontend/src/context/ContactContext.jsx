import React, { createContext, useState } from "react";
import {
  getContacts,
  addContact,
  getSingleContact,
  updateContact as updateContactService,
  deleteContact as deleteContactService,
} from "../services/contactService";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all contacts from the API
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

  // Fetch a single contact by ID
  const fetchSingleContact = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSingleContact(id);
      return data; // Return specific contact data
    } catch (error) {
      setError("Failed to fetch contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing contact
  const updateContact = async (id, updatedContact) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateContactService(id, updatedContact);
      setContacts((prevContacts) =>
        prevContacts.map((contact) => (contact._id === id ? updated : contact))
      );
    } catch (error) {
      setError("Failed to update contact. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a contact
  const deleteContact = async (contactId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteContactService(contactId);
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
        fetchSingleContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
