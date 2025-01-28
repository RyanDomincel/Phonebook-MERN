import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa"; // For the delete icon
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";

const ContactList = ({ contacts, loading, error, refreshContacts }) => {
  const { fetchContacts, deleteContact } = useContext(ContactContext);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDeleteClick = (contact) => {
    setSelectedContact(contact); // Set the contact to be deleted
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const confirmDelete = async () => {
    if (selectedContact) {
      await deleteContact(selectedContact._id); // Call the deleteContact function
      refreshContacts(); // Refresh the contact list after deleting
    }
    setShowConfirmation(false); // Close the confirmation dialog
  };

  const cancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation dialog
  };

  return (
    <div>
      <h1>Contact List</h1>

      {/* Handle Loading and Error States */}
      {loading ? (
        <p>Loading contacts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white p-4 rounded-lg shadow-md relative"
              >
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleDeleteClick(contact)}
                    className="text-red-500 hover:text-red-700 bg-white hover:bg-white"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
                <h3 className="text-lg font-semibold">
                  {contact.firstName} {contact.lastName}
                </h3>
                <p className="text-gray-600">{contact.contactNumber}</p>
                <p className="text-gray-600">{contact.email}</p>
              </div>
            ))
          ) : (
            <p>No contacts found.</p>
          )}
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this contact?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
