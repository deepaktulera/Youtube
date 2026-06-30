import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const WatchLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`pt-15 transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-40" : "lg:pl-5"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
};

export default WatchLayout;