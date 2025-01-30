import React, { useState, useEffect } from "react";
import { getContacts } from "../services/contactService"; // Import the service
import ContactList from "../components/Contacts/ContactList";
import ContactForm from "../components/Contacts/ContactForm";
import NavbarComp from "../components/navbar/Navbar";

const Phonebook = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const contactsData = await getContacts();
      setContacts(contactsData.contacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <NavbarComp />

      {/* Main Content */}
      <div className="p-6 ">
        <ContactForm refreshContacts={fetchContacts} />{" "}
        {/* Pass refreshContacts as a prop */}
        <ContactList
          contacts={contacts}
          loading={loading}
          error={error}
          refreshContacts={fetchContacts}
        />
      </div>
    </div>
  );
};

export default Phonebook;
