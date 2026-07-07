import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Change this value to "JWT" or "Bearer"
    const authScheme = "JWT";

    config.headers.Authorization = `${authScheme} ${token}`;
  }

  return config;
});

export default api;