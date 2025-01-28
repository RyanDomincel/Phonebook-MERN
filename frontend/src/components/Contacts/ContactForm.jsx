import React, { useState, useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const ContactForm = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
  });

  const { createContact } = useContext(ContactContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact(contact);
    setContact({ firstName: "", lastName: "", contactNumber: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Contact</h1>
      <input
        type="text"
        placeholder="First Name"
        value={contact.firstName}
        onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={contact.lastName}
        onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contact.contactNumber}
        onChange={(e) =>
          setContact({ ...contact, contactNumber: e.target.value })
        }
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
