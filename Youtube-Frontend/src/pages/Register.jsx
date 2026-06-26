import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '/YouTube-Logo.svg'

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleSubmit (e){
    e.preventDefault()
  }

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
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
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