import axios from "axios";

const API_URL = "http://localhost:4000/api/contacts";

// Fetch all contacts
export const getContacts = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

// Fetch a single contact by ID
export const getSingleContact = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

// Add a new contact
export const addContact = async (contact) => {
  const response = await axios.post(API_URL, contact, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

// Update a contact
export const updateContact = async (id, updatedContact) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedContact, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

// Delete a contact
export const deleteContact = async (contactId) => {
  const response = await axios.delete(`${API_URL}/${contactId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
