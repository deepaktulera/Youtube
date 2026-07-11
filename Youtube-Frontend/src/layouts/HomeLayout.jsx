import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Search state
  const [search, setSearch] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      <Header
        toggleSidebar={toggleSidebar}
        search={search}
        setSearch={setSearch}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`pt-14 transition-all duration-300 ${isSidebarOpen ? "md:pl-52" : "lg:pl-15"
          }`}
      >
        <Outlet context={{ search }} />
      </main>
    </div>
  );
};

export default HomeLayout;