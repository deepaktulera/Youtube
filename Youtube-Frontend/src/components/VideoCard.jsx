import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="block w-full p-2">
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-2xl group">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className="w-full h-64 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Video Details */}
      <div className="flex gap-3 mt-3">
        {/* Channel Logo */}
        <img
          src={video.channelLogo}
          alt={video.channel}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Text */}
        <div>
          <h2 className="font-semibold text-sm line-clamp-2">{video.title}</h2>

          <p className="text-sm text-gray-600 mt-1">{video.channel}</p>

          <p className="text-xs text-gray-500">{video.views}</p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
