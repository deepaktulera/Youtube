import React from "react";
import { Link } from "react-router-dom";

const VideoCard = () => {
  return (
    <Link to={'/watch/:id'} className="w-full p-2 rounded-2xl">
      <div className="overflow-hidden rounded-2xl group">
        <img
          src="https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w5MjY1MDh8MHwxfHNlYXJjaHwxfHxhcHBsZXxlbnwwfHx8fDE3NzY0MDU1MzJ8MA&ixlib=rb-4.1.0&q=85"
          alt="video_url"
          className="w-full h-60 object-cover object-center rounded-2xl transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex gap-2 items-center mt-2">
        <div className="h-10 w-10">
          <img
            src="https://www.bing.com/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?w=193&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            alt="logo"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold">The JS</h2>
          <h2 className="text-xs">Harry</h2>
          <h2 className="text-xs">13k Views</h2>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
