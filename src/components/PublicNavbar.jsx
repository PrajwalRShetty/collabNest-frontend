import React from "react";
import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    
    <nav className="bg-black px-4 py-3 flex justify-between items-center">
     <div className="flex items-center space-x-2">
        <img
          src="https://via.placeholder.com/40"
          alt="App Logo"
          className="w-8 h-8 object-cover rounded-full"
        />
      <div className="text-white font-bold ">SwapSkill</div>
      </div>
      <button
        className="bg-orange-800 text-white px-4 py-2 rounded"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </nav>
  );
};

export default PublicNavbar;
