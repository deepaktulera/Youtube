import React from "react";
import VideoCard from "./VideoCard";

const videos = [
  {
    id: 1,
    title: "Learn JavaScript in One Shot",
    channel: "Code With Harry",
    views: "13K Views",
    thumbnail:
      "https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w5MjY1MDh8MHwxfHNlYXJjaHwxfHxhcHBsZXxlbnwwfHx8fDE3NzY0MDU1MzJ8MA&ixlib=rb-4.1.0&q=85",
    channelLogo:
      "https://www.bing.com/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?w=193&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  },
  {
    id: 2,
    title: "React Full Course",
    channel: "Programming Hub",
    views: "25K Views",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    channelLogo:
      "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    title: "Node.js Crash Course",
    channel: "Tech World",
    views: "40K Views",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
    channelLogo:
      "https://i.pravatar.cc/100?img=3",
  },
];

const VideoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;