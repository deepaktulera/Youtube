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

const VideoPlayer = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, []);

  async function fetchVideo() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/video/${id}`,
      );

      console.log(res.data);
      
      setVideo(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-6 px-1 lg:px-13">
        {/* Left Section */}
        <section>
          {/* Video */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
            <video src={video} controls className="w-full h-full" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mt-4">
            Learning JavaScript in One Shot
          </h1>

          {/* Channel + Buttons */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-5 gap-4">
            {/* Channel */}
            <div className="flex items-center gap-4">
              <img
                src="https://www.bing.com/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?w=193&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="Channel"
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex justify-between w-full">
                <div>
                  <h2 className="font-semibold text-lg">Harry</h2>

                  <p className="text-sm text-gray-500">13K subscribers</p>
                </div>
              </div>

              <button className="bg-black text-white px-5 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                Subscribe
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex overflow-x-auto gap-3  justify-center scrollbar-hide">
              <button className="flex items-center gap-2 shrink-0 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                <ThumbsUp size={18} />
                <span className="hidden sm:flex">Like</span>
              </button>

              <button className="flex items-center gap-2 shrink-0 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                <ThumbsDown size={18} />
                <span className="hidden sm:flex">Dislike</span>
              </button>

              <button className="flex items-center gap-2 shrink-0 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                <Forward size={18} />
                <span className="hidden sm:flex">Share</span>
              </button>

              <button className="flex items-center gap-2 shrink-0 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                <ArrowDownToLine size={18} />
                <span className="hidden sm:flex">Download</span>
              </button>

              <button className="flex items-center gap-2 shrink-0 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition">
                <Bookmark size={18} />
                <span className="hidden sm:flex">Save</span>
              </button>
            </div>
          </div>

          {/* Views */}
          <div className="mt-5 bg-gray-100 rounded-xl px-3 py-1">
            <p className="font-semibold">1.5M views • 2 days ago</p>

            <p className="mt-2 h-18 text-gray-700 overflow-y-auto">
              Learn JavaScript from beginner to advanced in this complete
              tutorial. In this video you'll understand variables, functions,
              arrays, objects, DOM manipulation, asynchronous JavaScript,
              promises, async/await, ES6 features and much more.
            </p>
          </div>

          {/* Comments */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            <div className="border rounded-lg p-4">
              <div className="flex gap-3">
                <img
                  src="https://i.pravatar.cc/50"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <h3 className="font-semibold">Deepak</h3>

                  <p className="text-gray-700">
                    Amazing explanation! This helped me understand JavaScript.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section */}
        <section className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            >
              <img
                src="https://picsum.photos/200/120"
                alt="thumbnail"
                className="w-40 h-24 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-sm line-clamp-2">
                  React Full Course for Beginners {item}
                </h3>

                <p className="text-sm text-gray-500 mt-1">CodeWithHarry</p>

                <p className="text-sm text-gray-500">200K views • 1 week ago</p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default VideoPlayer;
