import axios from "axios";

const API_URL = "http://localhost:4000/api/users";

export const resetPassword = async (resetToken, newPassword) => {
  try {
    console.log("newPassword =", newPassword);
    const response = await axios.post(
      `${API_URL}/reset-password/${resetToken}`,
      { password: newPassword }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
