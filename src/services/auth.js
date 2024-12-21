import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", 
  withCredentials: true,
});

export const signUp = (userData) => API.post("/auth/signup", userData);
export const login = (userData) => API.post("/auth/login", userData);
export const logout = () => API.post("/auth/logout");
export const refreshToken = () => API.post("/auth/refresh-token");
