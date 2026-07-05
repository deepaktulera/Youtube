import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      <Header toggleSidebar={toggleSidebar} />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`pt-14 transition-all duration-300 ${
          isSidebarOpen ? "md:pl-52" : "lg:pl-15"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
