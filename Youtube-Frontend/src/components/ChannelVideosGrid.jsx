import React, { useEffect, useState } from "react";
import { getChannelVideos } from "../services/videoService";
import ChannelVideo from "./ChannelVideo";
import Loader from "./Loader";

// Component to display all videos uploaded by a specific channel
const ChannelVideosGrid = ({ uploader }) => {
  // Controle the menu 
  const [openMenuId, setOpenMenuId] = useState(null);
  // Stores the list of videos
  const [videos, setVideos] = useState([]);

  // Controls the loading state
  const [loading, setLoading] = useState(true);

  // Fetch videos whenever the uploader changes
  useEffect(() => {
    fetchVideos();
  }, [uploader]);

  // Fetch videos uploaded by the current channel
  const fetchVideos = async () => {
    try {
      // Call the API
      const res = await getChannelVideos(uploader);

      // Save videos into state
      setVideos(res.data);
    } catch (error) {
      // Display error in console if API fails
      console.log(error.response?.data || error.message);
    } finally {
      // Stop loader after request completes
      setLoading(false);
    }
  };

  // Show loader while fetching data
  if (loading) {
    return <Loader />;
  }

  // Show message if no videos are available
  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <h2 className="text-gray-500 text-lg">No videos uploaded yet.</h2>
      </div>
    );
  }

  // Display all uploaded videos
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video) => (
        <ChannelVideo key={video._id} video={video} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />
      ))}
    </div>
  );
};

export default ChannelVideosGrid;
