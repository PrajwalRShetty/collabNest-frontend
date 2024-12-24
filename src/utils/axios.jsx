import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/v1/api", 
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip if the request has the "No-Auth" header
    if (originalRequest.headers["No-Auth"]) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await instance.post("auth/refresh-token");
        console.log("Token refreshed successfully");
        return instance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err.message);
        window.location.href = "/login"; 
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

  
export default instance;