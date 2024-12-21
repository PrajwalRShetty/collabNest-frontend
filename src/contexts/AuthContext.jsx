import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get("auth/user-info");
      setUser(response.data.user);
    } catch (err) {
      console.error("Failed to fetch user info:", err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate('/user-home'); 
    window.location.reload();
  };

  const logout = async () => {
    try {
      await axios.post("auth/logout");
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    } else {
      fetchUser();
    }
    setLoading(false);
  }, []); 

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
