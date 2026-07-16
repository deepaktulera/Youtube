import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/YouTube-Logo.svg";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

// Component for user login
const Login = () => {
  const navigate = useNavigate();

  // Manage login button loading state
  const [isLoading, setIsLoading] = useState(false);

  // Store login form values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update form data when input changes
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle user login
  const handleSubmit = async (e) => {
    // Prevent form submission refresh
    e.preventDefault();

    // Start loading state
    setIsLoading(true);

    try {
      // Send login credentials to backend
      const response = await loginUser(formData);

      // Extract user authentication data
      const { token, id, username, name } = response.data;

      // Store user information locally
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("username", username);
      localStorage.setItem("name", name);

      // Reset form fields
      setFormData({
        email: "",
        password: "",
      });

      // Show success message and redirect
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      // Show login error message
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      // Stop loading state
      setIsLoading(false);
    }
  };

  return (
    // Login page container
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Login form card */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Application logo */}
        <div className="mb-6 flex justify-center">
          <img src={Logo} alt="YouTube" className="h-25" />
        </div>

        {/* Page title */}
        <h2 className="text-center text-3xl font-semibold">
          Sign In
        </h2>

        {/* Login description */}
        <p className="mt-2 mb-6 text-center text-gray-500">
          Welcome back! Please login to your account.
        </p>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Password field */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Submit login button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-red-600 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to registration page */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="ml-2 font-semibold text-red-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;