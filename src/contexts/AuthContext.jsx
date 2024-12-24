import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
          const response = await axios.get("auth/user-info");
          if (response.data?.user) {
            setUser(response.data.user);
            Cookies.set("user", JSON.stringify(response.data.user), { expires: 7 });
          }
        } catch (err) {
          console.error("Error fetching user:", err.message);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };

      const login = (userData) => {
        if (!userData) return;
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        navigate("/"); 
      };

      const signup = (userData) => {
        if (!userData) return;
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        navigate("/"); 
      };
      

    const logout = async () => {
        try {
            await axios.post("auth/logout");
            setUser(null);
            Cookies.remove("user");
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err.message);
        }
    };

    useEffect(() => {
        const storedUser = Cookies.get("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setLoading(false);
        } else {
            fetchUser();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout,signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
