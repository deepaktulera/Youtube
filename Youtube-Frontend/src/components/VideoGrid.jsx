import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Loader from "./Loader";
import { getAllVideos } from "../services/videoService";

const VideoGrid = ({ category }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getAllVideos();
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter videos according to selected category
  const filteredVideos =
    category === "All"
      ? videos
      : videos.filter((video) => video.category === category);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
      {filteredVideos.length > 0 ? (
        filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center min-h-[50vh]">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-500">
            No videos found.
          </h2>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
