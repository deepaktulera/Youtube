import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Main application component
const App = () => {
  return (
    // Main application container
    <div className="min-h-screen">
      {/* Render all application routes */}
      <AppRoutes />

      {/* Global notification container for toast messages */}
      <ToastContainer
        position="top-center"
        autoClose={1500}
      />
    </div>
  );
};

export default App;