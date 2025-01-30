import React, { useState, useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const ContactForm = ({ refreshContacts }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
  });

  // Access createContact from ContactContext
  const { createContact } = useContext(ContactContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("contact ", contact);
    try {
      // Now createContact is correctly referenced from context
      await createContact(contact);
      setContact({ firstName: "", lastName: "", contactNumber: "", email: "" });
      refreshContacts(); // Refresh the contact list after adding
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Contact</h1>

      <div>
        <label htmlFor="firstName" className="block">
          First Name
        </label>
        <input
          type="text"
          placeholder="First Name"
          value={contact.firstName}
          onChange={(e) =>
            setContact({ ...contact, firstName: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block">
          Last Name
        </label>
        <input
          type="text"
          placeholder="Last Name"
          value={contact.lastName}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block">
          Contact Number
        </label>
        <input
          type="text"
          placeholder="Contact Number"
          value={contact.contactNumber}
          onChange={(e) =>
            setContact({ ...contact, contactNumber: e.target.value })
          }
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
