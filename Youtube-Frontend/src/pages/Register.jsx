import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/YouTube-Logo.svg";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

// Component for user registration
const Register = () => {
  const navigate = useNavigate();

  // Store registration form values
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update form state when input changes
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Check if both passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Password Not Match");
      return;
    }

    try {
      // Send user details to backend
      const response = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Show registration success message
      toast.success(response.data.message || "Registration Successful!");

      // Reset form fields
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect user to login page
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      // Show registration error message
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    // Registration page container
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Registration form card */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Application logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={Logo}
            alt="VideoTube"
            className="h-15 w-auto object-contain"
          />
        </div>

        {/* Page title */}
        <h2 className="text-center text-2xl font-semibold">
          Create Account
        </h2>

        {/* Registration description */}
        <p className="mt-2 mb-6 text-center text-gray-500">
          Join and start watching your favourite videos.
        </p>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name input */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Username input */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Password input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Confirm password input */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Submit registration button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 text-white transition hover:bg-red-700"
          >
            Register
          </button>
        </form>

        {/* Link to login page */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="ml-2 font-semibold text-red-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;