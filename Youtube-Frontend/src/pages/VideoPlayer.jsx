import React, { useEffect, useState } from "react";
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
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideo(id);
        setVideo(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getAllVideos();
        setRelatedVideos(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchVideos();
  }, []);

  if (!video) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="grid grid-cols-1 gap-6 px-1 lg:grid-cols-[5fr_2fr] lg:px-13">
        <section>
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <video
              src={video.videoUrl}
              controls
              className="h-full w-full"
            />
          </div>

          <h1 className="mt-4 text-2xl font-bold">
            {video.title}
          </h1>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://www.bing.com/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?w=193&h=137&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                alt="Channel"
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {video.channel}
                </h2>

                <p className="text-sm text-gray-500">
                  13K subscribers
                </p>
              </div>

              <button className="rounded-full bg-black px-5 py-2 text-white">
                Subscribe
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <ThumbsUp size={18} />
                <span className="hidden sm:block">Like</span>
              </button>

              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <ThumbsDown size={18} />
                <span className="hidden sm:block">Dislike</span>
              </button>

              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <Forward size={18} />
                <span className="hidden sm:block">Share</span>
              </button>

              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <ArrowDownToLine size={18} />
                <span className="hidden sm:block">Download</span>
              </button>

              <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <Bookmark size={18} />
                <span className="hidden sm:block">Save</span>
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-gray-100 px-3 py-3">
            <p className="font-semibold">{video.views} views</p>

            <p className="mt-2 text-gray-700">
              {video.description}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          {relatedVideos.map((item) => (
            <div
              key={item._id}
              className="flex cursor-pointer gap-3 rounded-lg p-2 hover:bg-gray-100"
            >
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="h-24 w-40 rounded-lg object-cover"
              />

              <div>
                <h3 className="line-clamp-2 text-sm font-semibold">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {item.channel}
                </p>

                <p className="text-sm text-gray-500">
                  {item.views} views
                </p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </div>
  );
};

export default VideoPlayer;