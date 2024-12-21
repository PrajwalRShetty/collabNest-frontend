import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const UserHomepage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Welcome, {user?.name || "User"}!</h1>
    </div>
  );
};

export default UserHomepage;
