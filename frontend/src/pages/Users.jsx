import React from "react";
import UserList from "../components/Users/UserList";
import UserApproval from "../components/Users/UserApproval";

const Users = () => {
  return (
    <div>
      <UserApproval />
      <UserList />
    </div>
  );
};

export default Users;
