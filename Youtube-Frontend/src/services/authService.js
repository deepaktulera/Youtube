import api from "./axios";

// Register User
export const registerUser = async (userData) => {
  return await api.post("/auth/register", userData);
};

// Login User
export const loginUser = async (userData) => {
  return await api.post("/auth/login", userData);
};