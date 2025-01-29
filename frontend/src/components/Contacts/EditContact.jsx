import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import Navbar from "../navbar/Navbar";

const EditContact = () => {
  const { id } = useParams(); // Get the contact ID from the URL
  const { fetchSingleContact, updateContact } = useContext(ContactContext);
  const [contact, setContact] = useState(null); // Initialize as null to avoid undefined errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getContactDetails = async () => {
      try {
        const contactDetails = await fetchSingleContact(id);
        setContact(contactDetails); // Set contact data
        setLoading(false);
      } catch (err) {
        setError("Failed to load contact.");
        setLoading(false);
      }
    };

    getContactDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const confirmUpdate = async () => {
    try {
      await updateContact(contact._id, contact); // Use `_id` for backend compatibility
      navigate(-1); // Navigate back
    } catch (err) {
      setError("Failed to update contact. Please try again.");
    }
    setShowConfirmation(false); // Close the confirmation dialog
  };

  const cancelUpdate = () => {
    setShowConfirmation(false); // Close the confirmation dialog
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <h1>Edit Contact</h1>
          <div>
            <label htmlFor="firstName" className="block">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={contact.firstName} // Set value to contact data
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={contact.lastName}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={contact.contactNumber}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Contact
          </button>
        </form>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">
                Are you sure you want to update this contact?
              </h3>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelUpdate}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditContact;
