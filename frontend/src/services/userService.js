import axios from "axios";

const API_URL = "http://localhost:4000/api/users";

export const getUsers = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const approveUser = async (userId) => {
  const response = await axios.patch(
    `${API_URL}/${userId}/approve`,
    {},
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data;
};
