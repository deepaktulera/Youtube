import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen">
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={1500}
      />
    </div>
  );
};

export default App;
