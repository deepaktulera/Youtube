import React, { useState } from "react";
import { Search, Menu, Bell, Plus, User, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getChannel } from "../services/channelService";
import { toast } from "react-toastify";

// Header component shown on top of all pages
const Header = ({ toggleSidebar, search, setSearch }) => {
  // Controls profile dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Controls mobile search visibility
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  // Get user data from local storage
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Create profile avatar letter
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  // Toggle profile dropdown
  function handleUser() {
    setIsOpen(!isOpen);
  }

  // Handle create video/channel navigation
  const handleCreate = async () => {
    // Redirect unauthenticated users to login
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Check if user has an existing channel
      await getChannel(username);

      // Open upload page if channel exists
      navigate("/upload");
    } catch (error) {
      if (error.response?.status === 404) {
        // Create channel if no channel exists
        navigate(`/create-channel/${username}`);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <nav className="flex bg-white w-full items-center justify-between fixed top-0 h-14 px-3 sm:px-5 z-50">
      {showMobileSearch ? (
        // Mobile search view
        <div className="flex items-center w-full md:hidden gap-2">
          <button
            onClick={() => setShowMobileSearch(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={22} />
          </button>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
          />

          <button className="p-2 rounded-full hover:bg-gray-100">
            <Search size={22} />
          </button>
        </div>
      ) : (
        <>
          {/* Left navigation section */}
          <section className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleSidebar} className="cursor-pointer">
              <Menu />
            </button>

            {/* Website logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/YouTube-Logo.svg"
                alt="logo"
                className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto object-contain"
              />
            </Link>
          </section>

          {/* Desktop search section */}
          <section className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 lg:w-md p-2 border border-gray-300 rounded-l-full px-5 outline-none"
            />

            <button className="px-5 py-2 border border-l-0 border-gray-300 rounded-r-full bg-gray-50 hover:bg-gray-100">
              <Search />
            </button>
          </section>

          {/* Right action section */}
          <section className="flex items-center gap-2">
            {/* Open mobile search */}
            <button
              onClick={() => setShowMobileSearch(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Search size={22} />
            </button>

            {/* Create content button */}
            <button
              onClick={handleCreate}
              className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <Plus strokeWidth={1.5} size={20} />
              <span className="hidden md:block">Create</span>
            </button>

            {/* Notification button */}
            <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
              <Bell size={22} />
            </button>

            {/* User authentication section */}
            {token ? (
              <div
                onClick={handleUser}
                className="relative w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer"
              >
                {firstLetter}

                {/* Profile dropdown menu */}
                {isOpen && (
                  <div className="absolute top-10 right-0 w-44 bg-white text-black rounded-xl shadow-lg py-2 z-50">
                    <div className="px-4 py-2">
                      <p className="font-semibold">{username}</p>
                    </div>

                    {/* Channel link */}
                    <Link
                      to={`/channel/${username}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View Channel
                    </Link>

                    {/* Logout action */}
                    <button
                      onClick={() => {
                        // Clear stored user data
                        localStorage.removeItem("token");
                        localStorage.removeItem("username");
                        localStorage.removeItem("name");
                        localStorage.removeItem("id");

                        toast.success("Logged out successfully!");

                        // Redirect after logout
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
              // Login button for guest users
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
