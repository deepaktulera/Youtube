import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video._id}`} className="w-full p-2 rounded-2xl">
      <div className="overflow-hidden rounded-2xl group">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-70 object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
          {video.channel.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="font-semibold line-clamp-2">{video.title}</h2>

          <p className="text-sm text-gray-600">{video.channel}</p>

          <p className="text-xs text-gray-500">{video.views} views</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
