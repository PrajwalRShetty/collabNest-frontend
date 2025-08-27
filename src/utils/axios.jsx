import axios from "axios";

const instance = axios.create({
  baseURL: "https://collabnest-backend.onrender.com/v1/api", 
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Skip interceptor for No-Auth requests
    if (originalRequest.headers["No-Auth"]) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return instance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await instance.post("auth/tokens");
        console.log("Token refreshed successfully");
        processQueue(null);
        return instance(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err.message);
        processQueue(err, null);
        
        // Only redirect to login if we're not already there
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

  
export default instance;