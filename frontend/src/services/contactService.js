import axios from "axios";

const API_URL = "http://localhost:4000/api/contacts";

export const getContacts = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const addContact = async (contact) => {
  const response = await axios.post(API_URL, contact, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

// New delete contact function
export const deleteContact = async (contactId) => {
  const response = await axios.delete(`${API_URL}/${contactId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
