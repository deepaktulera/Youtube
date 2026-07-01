import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// custom 404 page
const NotFound = () => {
  return (
    <div className="relative h-screen bg-white overflow-hidden">
      {/* not found message */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold text-center md:py-6 bg-linear-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          Page Not Found
        </h1>
        <p className="text-xl md:text-2xl text-center px-6 py-3 text-gray-400 leading-relaxed max-w-2xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>

        {/* redirect user to home page */}
        <Link
          to="/"
          className="mt-6 px-8 py-4 rounded-full font-semibold text-lg bg-linear-to-r from-green-400 to-emerald-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg shadow-green-500/30 hover:scale-105 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
