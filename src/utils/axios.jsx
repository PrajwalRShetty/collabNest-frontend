import axios from "axios";

const instance = axios.create({
  baseURL: "https://collabnest-backend.onrender.com/v1/api", 
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to log outgoing requests
instance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('With credentials:', config.withCredentials);
    console.log('Headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

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

// Reset refresh attempts every 5 minutes
setInterval(() => {
  refreshAttempts = 0;
}, 5 * 60 * 1000);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Skip interceptor for No-Auth requests
    if (originalRequest.headers["No-Auth"]) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Check if we've exceeded max refresh attempts
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        console.log('Max refresh attempts exceeded, redirecting to login');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

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
      refreshAttempts++;

      try {
        console.log(`Token refresh attempt ${refreshAttempts}/${MAX_REFRESH_ATTEMPTS}`);
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