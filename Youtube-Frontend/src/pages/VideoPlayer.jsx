import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Forward,
  ArrowDownToLine,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
} from "lucide-react";
import { getAllVideos, getVideo } from "../services/videoService";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    fetchVideo();
  }, [id]);

  async function fetchVideo() {
    try {
      const res = await getVideo(id);
      setVideo(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);
  async function fetchVideos() {
    try {
      const res = await getAllVideos();
      setvideos(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }
  console.log(videos);
  

  return (
    <div className="min-h-screen bg-white">
      <section className="grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-6 px-1 lg:px-13">
        {/* Left Section */}
        <section>
          {/* Video */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video
              src={video.videoUrl} // Change if your field name is different
              controls
              className="w-full h-full"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mt-4">{video.title}</h1>

          {/* Channel + Buttons */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-5 gap-4">
            <div className="flex items-center gap-4">
              <img
                src="https://www.bing.com/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?w=193&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="Channel"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h2 className="font-semibold text-lg">{video.channel}</h2>
                <p className="text-sm text-gray-500">13K subscribers</p>
              </div>

              <button className="bg-black text-white px-5 py-2 rounded-full">
                Subscribe
              </button>
            </div>

            <div className="flex overflow-x-auto gap-3 scrollbar-hide">
              <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <ThumbsUp size={18} />
                <span className="hidden sm:block">Like</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <ThumbsDown size={18} />
                <span className="hidden sm:block">Dislike</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <Forward size={18} />
                <span className="hidden sm:block">Share</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <ArrowDownToLine size={18} />
                <span className="hidden sm:block">Download</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                <Bookmark size={18} />
                <span className="hidden sm:block">Save</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-5 bg-gray-100 rounded-xl px-3 py-3">
            <p className="font-semibold">{video.views || 0} views</p>

            <p className="mt-2 text-gray-700">
              {video.description || "No description available."}
            </p>
          </div>
        </section>

        {/* Right Section */}
        <section className="space-y-4">
          {videos.map((item) => (
            
            <div
              key={item}
              className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            >
              <img
                src={videos.thumbnailUrl}
                alt="thumbnail"
                className="w-40 h-24 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-sm line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">{item.channel}</p>

                <p className="text-sm text-gray-500">{item.views} views • 1 week ago</p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default VideoPlayer;
