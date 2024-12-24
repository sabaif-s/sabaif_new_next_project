import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Set your base URL
  timeout: 10000,  // Optional: set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // Add any additional default headers here
  },
});

// Request interceptor (optional, e.g., for adding auth token)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Add authorization token if available
//     const token = localStorage.getItem('token'); // or sessionStorage or cookies
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Response interceptor (optional, e.g., for handling errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally here (e.g., token expiration)
    if (error.response.status === 401) {
      // Redirect to login or handle token expiry logic
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
