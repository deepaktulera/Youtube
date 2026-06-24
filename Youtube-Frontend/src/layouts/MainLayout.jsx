import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <div className="h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <main
        className={`pt-14 transition-all duration-300 ${
          isSidebarOpen ? "md:pl-45" : "md:pl-14"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
