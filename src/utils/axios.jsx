import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/v1/api", 
  withCredentials: true,
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          await instance.post("auth/refresh-token"); 
          console.log("Token refreshed successfully");
          return instance(originalRequest); 
        } catch (err) {
          console.error("Token refresh failed:", err.message);
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
export default instance;