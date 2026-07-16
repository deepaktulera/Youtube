import axios from "axios";

// Create a reusable Axios instance with the backend API URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add authentication token to every API request
api.interceptors.request.use((config) => {
  // Get user token from local storage
  const token = localStorage.getItem("token");

  // Add Authorization header if user is logged in
  if (token) {
    // Authentication scheme used by the backend
    const authScheme = "JWT";

    // Attach token to request headers
    config.headers.Authorization = `${authScheme} ${token}`;
  }

  // Return updated request configuration
  return config;
});

// Export configured Axios instance for API calls
export default api;