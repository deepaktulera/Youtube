import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const ChannelLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`pt-15 transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-40" : "lg:pl-20"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default ChannelLayout;