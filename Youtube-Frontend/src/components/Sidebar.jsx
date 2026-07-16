import React from "react";
import { NavLink } from "react-router-dom";

import HomeIcon from "../assets/icons/home-material.svg";
import ShortsIcon from "../assets/icons/youtube_shorts.svg";
import SubscribeIcon from "../assets/icons/subscriptions.svg";
import UserIcon from "../assets/icons/user.svg";

// Sidebar navigation component
const Sidebar = ({ isSidebarOpen }) => {
  // Get user authentication data
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Define sidebar menu items
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Shorts",
      path: "/shorts",
      icon: ShortsIcon,
    },
    {
      name: "Subscription",
      path: "/subscription",
      icon: SubscribeIcon,
    },
    {
      name: "You",
      path: token ? `/channel/${username}` : "/login",
      icon: UserIcon,
    },
  ];

  return (
    // Sidebar container
    <aside
      className={
        isSidebarOpen
          ? "fixed top-14 left-0 bottom-0 w-52 bg-white z-40 overflow-hidden transition-all duration-300"
          : "fixed top-14 left-0 bottom-0 w-0 lg:w-16 bg-white z-40 overflow-hidden transition-all duration-300"
      }
    >
      {/* Display navigation items */}
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => {
            // Base link styles
            let classes = "mx-2 rounded-xl hover:bg-gray-100 ";

            // Change layout based on sidebar width
            if (isSidebarOpen) {
              classes += "flex items-center gap-4 px-4 py-3 ";
            } else {
              classes += "flex flex-col items-center justify-center py-4 ";
            }

            // Highlight active page
            if (isActive) {
              classes += "bg-gray-200 font-semibold";
            }

            return classes;
          }}
        >
          {/* Menu icon */}
          <img
            src={item.icon}
            alt={item.name}
            className="w-6 h-6 object-contain"
          />

          {/* Display menu text when expanded */}
          {isSidebarOpen && <span className="text-sm">{item.name}</span>}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;