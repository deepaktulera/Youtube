import React from "react";
import { Search, Menu, Bell, Plus } from "lucide-react";

const Header = () => {
  return (
    // Main navigation bar
    <nav className="flex items-center justify-between gap-2 sticky top-0 h-14 px-4 bg-white z-50">

      {/* Left section - hamburger menu + logo */}
      <section className="flex items-center gap-4">
        <button className="cursor-pointer">
          <Menu />
        </button>

        <div>
          <img
            src="/YouTube-Logo.svg"
            alt="logo"
            className="h-18 object-cover"
          />
        </div>
      </section>

      {/* Center section - search bar */}
      <section className="hidden md:flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="w-[450px] p-2 border border-gray-300 rounded-l-full px-5 outline-none"
        />

        <button className="px-5 py-2 border border-l-0 border-gray-300 rounded-r-full bg-gray-50 hover:bg-gray-100 cursor-pointer">
          <Search />
        </button>
      </section>

      {/* Right section - create, notifications and profile */}
      <section className="flex items-center gap-2">

        {/* Create video button */}
        <button className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer">
          <Plus strokeWidth={1.5} size={20} />
          <span>Create</span>
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
          <Bell size={22} />
        </button>

        {/* User profile avatar */}
        <button className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer">
          B
        </button>

      </section>
    </nav>
  );
};

export default Header;