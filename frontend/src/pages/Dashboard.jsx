import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../services/contactService"; // Import from contactService
import NavbarComp from "../components/navbar/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [myContacts, setMyContacts] = useState([]);
  const [sharedContacts, setSharedContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");

    try {
      const contactsData = await getContacts(); // Use contactService here
      setMyContacts(contactsData.contacts || []);
      setSharedContacts(contactsData.sharedContacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateContact = () => {
    navigate("/phonebook");
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <NavbarComp />

      {/* Main Content */}
      <div className="p-6">
        {loading ? (
          <p className="text-gray-600">Loading contacts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="flex items-center justify-between">
              {/* My Contacts */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                My Contacts
              </h2>
              {/* Create Contact Button */}
              <div className="px-6 py-4 flex justify-end">
                <button
                  onClick={handleCreateContact}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create Contact
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myContacts.length > 0 ? (
                myContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-gray-600">{contact.contactNumber}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No contacts found.</p>
              )}
            </div>

            {/* Shared Contacts */}
            <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
              Shared With Me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sharedContacts.length > 0 ? (
                sharedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold">
                      {contact.firstName} {contact.lastName}
                    </h3>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-gray-600">{contact.contactNumber}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No shared contacts found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
