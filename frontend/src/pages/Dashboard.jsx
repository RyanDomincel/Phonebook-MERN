import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import contactIMG from "../assets/contact-book.png";

const API_URL = "http://localhost:4000/api/contacts"; // Backend API

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
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if no token
        return;
      }

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API response for Contacts:", response.data);
      // Assuming API returns { myContacts: [], sharedContacts: [] }
      setMyContacts(response.data.contacts || []);
      setSharedContacts(response.data.sharedContacts || []);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to fetch contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={contactIMG} alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-gray-800 ml-3">Contactopia</h1>
        </div>
        <div className="flex items-center space-x-4">
          <img
            src={contactIMG}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-6">
        {loading ? (
          <p className="text-gray-600">Loading contacts...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* My Contacts */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              My Contacts
            </h2>
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
