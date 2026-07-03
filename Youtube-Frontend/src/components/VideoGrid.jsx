import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "./VideoCard";
import Loader from "./Loader";
import { getAllVideos } from "../services/videoService";

const VideoGrid = () => {
  const [videos, setvideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getAllVideos();
      setvideos(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
