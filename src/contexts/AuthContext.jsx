import React, { createContext, useState, useEffect } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import TokenStorage from "../utils/tokenStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
          console.log('AuthContext: Attempting to fetch user data...');
          const response = await axios.get("auth/users/me");
          if (response.data?.user) {
            console.log('AuthContext: User data fetched successfully');
            setUser(response.data.user);
            Cookies.set("user", JSON.stringify(response.data.user), { expires: 7 });
          } else {
            console.log('AuthContext: No user data in response');
            setUser(null);
          }
        } catch (err) {
          console.error("AuthContext: Error fetching user:", err.message);
          if (err.response?.status === 401) {
            console.log('AuthContext: User not authenticated, setting user to null');
          }
          setUser(null);
          // Clear any stale cookies if user fetch fails
          Cookies.remove("user");
        } finally {
          setLoading(false);
        }
      };

      const login = (userData, tokens) => {
        if (!userData) return;
        
        // Store tokens if provided
        if (tokens) {
          TokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        }
        
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        navigate("/"); 
      };

      const signup = (userData, tokens) => {
        if (!userData) return;
        
        // Store tokens if provided
        if (tokens) {
          TokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
        }
        
        setUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });
        navigate("/"); 
      };
      

    const logout = async () => {
        try {
            await axios.delete("auth/sessions");
            setUser(null);
            Cookies.remove("user");
            TokenStorage.clearTokens();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err.message);
            // Clear tokens even if logout request fails
            setUser(null);
            Cookies.remove("user");
            TokenStorage.clearTokens();
            navigate("/login");
        }
    };

    useEffect(() => {
        const storedUser = Cookies.get("user");
        const hasTokens = TokenStorage.hasValidTokens();
        
        if (storedUser && hasTokens) {
            try {
                setUser(JSON.parse(storedUser));
                setLoading(false);
            } catch (err) {
                console.error("Error parsing stored user:", err);
                Cookies.remove("user");
                TokenStorage.clearTokens();
                setUser(null);
                setLoading(false);
            }
        } else if (hasTokens) {
            // Has tokens but no user data, try to fetch user
            fetchUser();
        } else {
            // No tokens, clear everything and set loading to false
            setUser(null);
            Cookies.remove("user");
            TokenStorage.clearTokens();
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout,signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
