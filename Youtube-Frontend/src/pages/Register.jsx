import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/YouTube-Logo.svg";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

// Registration page for creating a new account
const Register = () => {
  const navigate = useNavigate();

  // Store all registration form data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update form values when the user types
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Password Not Match")
      return;
    }

    try {
      // Register the user
      const response = await registerUser({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Show success message
      toast.success(response.data.message || "Registration Successful!")

      // Clear the form
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login page
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      // Display error message
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Registration Card */}
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Application Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src={Logo}
            alt="VideoTube"
            className="h-15 w-auto object-contain"
          />
        </div>

        {/* Page Heading */}
        <h2 className="text-center text-2xl font-semibold">Create Account</h2>

        {/* Welcome Message */}
        <p className="mt-2 mb-6 text-center text-gray-500">
          Join and start watching your favourite videos.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 text-white transition hover:bg-red-700"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
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
