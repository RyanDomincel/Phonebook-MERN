import React, { createContext, useState } from "react";
import { getUsers, approveUser } from "../services/userService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const approveUserById = async (userId) => {
    await approveUser(userId);
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, isApproved: true } : user
      )
    );
  };

  return (
    <UserContext.Provider
      value={{ users, fetchUsers, approveUser: approveUserById }}
    >
      {children}
    </UserContext.Provider>
  );
};
