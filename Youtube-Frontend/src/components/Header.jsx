import React, { useState } from "react";
import { Search, Menu, Bell, Plus, User, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getChannel } from "../services/channelService";
import { toast } from "react-toastify";

// Header component displayed at the top of every page
const Header = ({ toggleSidebar }) => {
  // Controls the user profile dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Controls the mobile search bar
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  // Get user authentication details from local storage
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Get the first letter of the username for the profile avatar
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  // Toggle the user dropdown menu
  function handleUser() {
    setIsOpen(!isOpen);
  }

  // Handle Create button click
  const handleCreate = async () => {
    // Redirect to login if user is not authenticated
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Check whether the user already has a channel
      await getChannel(username);

      // Navigate to upload page if channel exists
      navigate("/upload");
    } catch (error) {
      if (error.response?.status === 404) {
        // Redirect to create channel page if channel doesn't exist
        navigate(`/create-channel/${username}`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <nav className="flex bg-white w-full items-center justify-between fixed top-0 h-14 px-3 sm:px-5 z-50">
      {showMobileSearch ? (
        // Mobile Search Layout
        <div className="flex items-center w-full md:hidden gap-2">
          <button
            onClick={() => setShowMobileSearch(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={22} />
          </button>

          <input
            type="text"
            placeholder="Search"
            autoFocus
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
          />

          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search size={22} />
          </button>
        </div>
      ) : (
        <>
          {/* Left Section */}
          <section className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleSidebar} className="cursor-pointer">
              <Menu />
            </button>

            <Link to="/" className="flex items-center">
              <img
                src="/YouTube-Logo.svg"
                alt="logo"
                className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto object-contain"
              />
            </Link>
          </section>

          {/* Desktop Search */}
          <section className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-64 lg:w-md p-2 border border-gray-300 rounded-l-full px-5 outline-none"
            />

            <button className="px-5 py-2 border border-l-0 border-gray-300 rounded-r-full bg-gray-50 hover:bg-gray-100">
              <Search />
            </button>
          </section>

          {/* Right Section */}
          <section className="flex items-center gap-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Search size={22} />
            </button>

            {/* Create Button */}
            <button
              onClick={handleCreate}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <Plus strokeWidth={1.5} size={20} />
              <span className="hidden md:block">Create</span>
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
              <Bell size={22} />
            </button>

            {/* User Profile */}
            {token ? (
              <div
                onClick={handleUser}
                className="relative w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer"
              >
                {firstLetter}

                {/* User Dropdown */}
                {isOpen && (
                  <div className="absolute top-10 right-0 w-44 bg-white text-black rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2">
                      <p className="font-semibold">{username}</p>
                    </div>

                    <Link
                      to={`/channel/${username}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Channel
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        localStorage.removeItem("name");
                        localStorage.removeItem("id");

                        toast.success("Logged out successfully!");

                        setTimeout(() => {
                          navigate("/");
                          window.location.reload();
                        }, 1000);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Sign In Button
              <Link
                to="/login"
                className="flex items-center gap-1 px-2 py-1 border-2 border-blue-400 rounded-full"
              >
                <User color="blue" size={20} />
                <span className="text-blue-700 font-bold hidden sm:block">
                  Sign In
                </span>
              </Link>
            )}
          </section>
        </>
      )}
    </nav>
  );
};

export default Header;
