import React, { useState } from "react";
import ChannelVideos from "../components/ChannelVideos";

const Channel = () => {
  const [activeTab, setActiveTab] = useState("home");
  const username = localStorage.getItem("username") || "username";
  const name = localStorage.getItem("name") || "Channel Name";

  return (
    <div className="w-full">
      {/* Channel Info */}
      <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-8 lg:px-10 py-6">
        <img
          className="h-20 w-20 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full object-cover object-center flex-shrink-0"
          src="https://images.unsplash.com/photo-1630563451961-ac2ff27616ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w5MjY1MDh8MHwxfHNlYXJjaHwxfHxhcHBsZXxlbnwwfHx8fDE3NzY0MDU1MzJ8MA&ixlib=rb-4.1.0&q=85"
          alt="profile_image"
        />

        <div className="flex-1">
          <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold">
            {name}
          </h2>

          <h3 className="text-gray-600 text-sm sm:text-base mt-1">
            @{username}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            0 subscribers • 0 videos
          </p>

          <button className="mt-4 px-4 sm:px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition text-sm sm:text-base">
            Edit Channel
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b px-4 sm:px-8 lg:px-10">
        <div className="flex gap-8 text-base sm:text-lg font-semibold">
          <button
            onClick={() => setActiveTab("home")}
            className={`pb-3 transition ${
              activeTab === "home"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab("videos")}
            className={`pb-3 transition ${
              activeTab === "videos"
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            Videos
          </button>
        </div>
      </div>

      {/* Videos */}
      <div className="px-4 sm:px-8 lg:px-10 py-6">
        <ChannelVideos uploader={username}/>
      </div>
    </div>
  );
};

export default Channel;
