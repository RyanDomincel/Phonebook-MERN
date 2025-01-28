import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";

const UserList = () => {
  const { users, fetchUsers } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
