import api from "./axios";

// Service function to register a new user
export const registerUser = async (userData) => {
  // Send user registration data to the backend API
  return await api.post("/auth/register", userData);
};

// Service function to login an existing user
export const loginUser = async (userData) => {
  // Send login credentials to the backend API
  return await api.post("/auth/login", userData);
};