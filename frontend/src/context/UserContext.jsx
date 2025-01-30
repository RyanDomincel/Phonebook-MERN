import React, { createContext, useState, useEffect } from "react";
import { getUsers } from "../services/userService";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkTokenAndFetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setCurrentUser(null);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setCurrentUser(null);
          return;
        }

        // Fetch user details using decoded._id
        const allUsers = await getUsers();
        const user = allUsers.find((u) => u._id === decoded._id);

        if (user) {
          setCurrentUser({
            name: user.name || "User",
            profilePic:
              user.profilePic ||
              "https://xsgames.co/randomusers/avatar.php?g=male",
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setCurrentUser(null);
      }
    };

    checkTokenAndFetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
