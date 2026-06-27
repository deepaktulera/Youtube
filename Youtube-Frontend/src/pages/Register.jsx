import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/YouTube-Logo.svg";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(res.data);
      alert("Registration Successful!");

      // Clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            alt="YouTube"
            className="h-25"
          />
        </div>

        <h2 className="text-3xl font-semibold text-center">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mt-2 mb-6">
          Join and start watching your favourite videos.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-red-600 ml-2 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;