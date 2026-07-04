import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/YouTube-Logo.svg";
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await loginUser(formData);

      const { token, id, username, name } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      localStorage.setItem("username", username);
      localStorage.setItem("name", name);

      setFormData({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <img src={Logo} alt="YouTube" className="h-25" />
        </div>

        <h2 className="text-center text-3xl font-semibold">
          Sign In
        </h2>

        <p className="mt-2 mb-6 text-center text-gray-500">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-red-600 py-3 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

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