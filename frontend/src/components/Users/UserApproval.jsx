import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UserApproval = () => {
  const { approveUser, users } = useContext(UserContext);

  return (
    <div>
      <h1>Approve Users</h1>
      <ul>
        {users
          .filter((user) => !user.isApproved)
          .map((user) => (
            <li key={user._id}>
              {user.email}
              <button onClick={() => approveUser(user._id)}>Approve</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserApproval;
