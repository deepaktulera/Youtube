import React from "react";
import { Link } from "react-router-dom";

// Displays a single video card
const VideoCard = ({ video }) => {
  return (
    // Link to video watch page
    <Link to={`/watch/${video._id}`} className="w-full p-1 border border-emerald-500 rounded-xl">
      {/* Video thumbnail section */}
      <div className="overflow-hidden aspect-video rounded-xl group">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full object-contain rounded-xl transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Video details section */}
      <div className="flex gap-4 pl-2 mt-3">
        {/* Channel profile avatar */}
        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
          {video.channel.charAt(0).toUpperCase()}
        </div>

        <div>
          {/* Video title */}
          <h2 className="font-semibold line-clamp-2">{video.title}</h2>

          {/* Channel name */}
          <p className="text-sm text-gray-600">{video.channel}</p>

          {/* Views count */}
          <p className="text-xs text-gray-500">{video.views} views</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
