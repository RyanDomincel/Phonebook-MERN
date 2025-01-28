import React from "react";

const ContactDetails = ({ contact }) => {
  return (
    <div>
      <h2>Contact Details</h2>
      <p>
        <strong>Name:</strong> {contact.firstName} {contact.lastName}
      </p>
      <p>
        <strong>Contact Number:</strong> {contact.contactNumber}
      </p>
      <p>
        <strong>Email:</strong> {contact.email}
      </p>
    </div>
  );
};

export default ContactDetails;
