import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '/YouTube-Logo.svg'

const Login = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

        <h2 className="text-3xl font-semibold text-center">Sign In</h2>
        <p className="text-gray-500 text-center mt-2 mb-6">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
          type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?
          <Link
            to="/register"
            className="text-red-600 ml-2 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;