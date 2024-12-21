import React from "react";
import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    
    <nav className="bg-blue-500 px-4 py-2 flex justify-between items-center">
      <div className="text-white font-bold">SwapSkill</div>
      <button
        className="bg-white text-blue-500 px-4 py-2 rounded"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </nav>
  );
};

export default PublicNavbar;
