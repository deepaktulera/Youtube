import React from "react";
import { Link } from "react-router-dom";

import HomeIcon from "../assets/icons/home-material.svg";
import shortsIcon from "../assets/icons/youtube_shorts.svg";
import subscribeIcon from "../assets/icons/subscriptions.svg";
import userIcon from "../assets/icons/user.svg";

const Sidebar = ({ isSidebarOpen }) => {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Shorts",
      path: "/shorts",
      icon: shortsIcon,
    },
    {
      name: "Subscription",
      path: "/subscription",
      icon: subscribeIcon,
    },
    {
      name: "You",
      path: "/you",
      icon: userIcon,
    },
  ];

  return (
    <aside
      className={`
    fixed top-14 left-0 h-[calc(100vh-56px)]
    bg-white z-50 transition-all duration-300 overflow-hidden

    ${isSidebarOpen ? "w-56" : "w-0 md:w-16"}
  `}
    >
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`
            flex items-center
            ${
              isSidebarOpen ? "gap-4 px-4 py-3" : "flex-col justify-center py-4"
            }
            hover:bg-gray-100 rounded-xl mx-2
          `}
        >
          <img src={item.icon} alt={item.name} className="w-6 h-6" />

          {isSidebarOpen && <span className="text-sm">{item.name}</span>}
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
