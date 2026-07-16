import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AppLayout = ({ enableSearch = false, layoutType = "default" }) => {
  // Controls sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Stores search value
  const [search, setSearch] = useState("");

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Set main content spacing based on layout type
  const getMainClass = () => {
    if (layoutType === "channel") {
      return isSidebarOpen
        ? "pt-14 transition-all duration-300 lg:pl-40"
        : "pt-14 transition-all duration-300 lg:pl-20";
    }

    if (layoutType === "watch") {
      return isSidebarOpen
        ? "pt-14 transition-all duration-300 lg:pl-40"
        : "pt-14 transition-all duration-300 lg:pl-5";
    }

    // Home layout
    return isSidebarOpen
      ? "pt-14 transition-all duration-300 md:pl-52"
      : "pt-14 transition-all duration-300 lg:pl-15";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header
        toggleSidebar={toggleSidebar}
        search={search}
        setSearch={setSearch}
      />

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Page content */}
      <main className={getMainClass()}>
        {enableSearch ? (
          <Outlet context={{ search }} />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AppLayout;