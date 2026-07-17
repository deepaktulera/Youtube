import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { deleteVideo } from "../services/videoService";

// Displays a single channel video card
const ChannelVideo = ({ video, openMenuId, setOpenMenuId }) => {
  const navigate = useNavigate();

  // Reference for the menu container
  const menuRef = useRef(null);

  // Close the menu when clicking anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component is removed
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setOpenMenuId]);

  // Delete video handler
  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteVideo(video._id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Navigate to edit video page
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/edit-video/${video._id}`);
  };

  // Open or close the menu
  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (openMenuId === video._id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(video._id);
    }
  };

  return (
    <Link
      to={`/watch/${video._id}`}
      className="relative w-full p-1 rounded-2xl border"
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Video Information */}
      <div className="flex justify-between items-start mt-3">
        {/* Left Side */}
        <div className="flex gap-3 flex-1">
          {/* Channel Avatar */}
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
            {video.channel.charAt(0).toUpperCase()}
          </div>

          {/* Video Details */}
          <div className="flex-1">
            <h2 className="font-semibold line-clamp-2">
              {video.title}
            </h2>

            <p className="text-sm text-gray-600">
              {video.channel}
            </p>

            <p className="text-xs text-gray-500">
              {video.views} views
            </p>
          </div>
        </div>

        {/* Right Side - Three Dot Menu */}
        <div className="relative ml-2" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="p-1 rounded-full hover:bg-gray-200"
          >
            <EllipsisVertical size={20} />
          </button>

          {/* Show menu only for the selected video */}
          {openMenuId === video._id && (
            <div className="absolute right-2 top-0 w-28 bg-white rounded-lg shadow-lg border z-50">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChannelVideo;