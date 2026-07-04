import React, { useEffect, useState } from "react";
import { getChannelVideos } from "../services/videoService";
import VideoCard from "./VideoCard";
import Loader from "./Loader";

const ChannelVideos = ({ uploader }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, [uploader]);


  const fetchVideos = async () => {
    try {
      const res = await getChannelVideos(uploader);
      setVideos(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <h2 className="text-gray-500 text-lg">
          No videos uploaded yet.
        </h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default ChannelVideos;