import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { EllipsisVertical } from "lucide-react";
import { deleteVideo } from "../services/videoService";

// Displays a single channel video card
const ChannelVideo = ({ video, openMenuId, setOpenMenuId }) => {
  const navigate = useNavigate();

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

  return (
    // Link to video watch page
    <Link
      to={`/watch/${video._id}`}
      className="relative w-full p-1 rounded-2xl border"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* Video thumbnail */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="aspect-video object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
        />

        {/* Video options menu */}
        <div className="absolute right-2 top-2">
          {openMenuId !== video._id ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                // Open or close menu
                setOpenMenuId(
                  openMenuId === video._id ? null : video._id
                );
              }}
            >
              <EllipsisVertical />
            </button>
          ) : (
            // Edit and delete actions
            <div className="absolute right-0 top-0 flex flex-col rounded-lg bg-white shadow-lg p-2 z-50">
              <button
                onClick={handleEdit}
                className="px-4 py-2 hover:bg-gray-100 text-left"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 hover:bg-red-100 text-red-600 text-left"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video information */}
      <div className="flex gap-3 mt-3">
        {/* Channel avatar */}
        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
          {video.channel.charAt(0).toUpperCase()}
        </div>

        {/* Video details */}
        <div>
          <h2 className="font-semibold line-clamp-2">{video.title}</h2>

          <p className="text-sm text-gray-600">{video.channel}</p>

          <p className="text-xs text-gray-500">{video.views} views</p>
        </div>
      </div>
    </Link>
  );
};

export default ChannelVideo;