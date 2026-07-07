import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/YouTube-Logo.svg";
import { loginUser } from "../services/authService";

// Login page
const Login = () => {
  const navigate = useNavigate();

  // Controls loading state while logging in
  const [isLoading, setIsLoading] = useState(false);

  // Stores login form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Update form values when user types
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Show loading state
    setIsLoading(true);

    try {
      // Authenticate user
      const response = await loginUser(formData);

      const { token, id, username, name } = response.data;

      // Save user data in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("username", username);
      localStorage.setItem("name", name);

      // Clear form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      // Display error message
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      // Stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Login Card */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Application Logo */}
        <div className="mb-6 flex justify-center">
          <img src={Logo} alt="YouTube" className="h-25" />
        </div>

        {/* Page Heading */}
        <h2 className="text-center text-3xl font-semibold">Sign In</h2>

        {/* Welcome Message */}
        <p className="mt-2 mb-6 text-center text-gray-500">
          Welcome back! Please login to your account.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-red-600 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Registration Link */}
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
