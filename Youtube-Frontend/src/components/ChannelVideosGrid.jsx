import React, { useEffect, useState } from "react";
import { getChannelVideos } from "../services/videoService";
import ChannelVideo from "./ChannelVideo";
import Loader from "./Loader";

// Displays all videos uploaded by a channel
const ChannelVideosGrid = ({ uploader }) => {
  // Stores the currently opened video menu
  const [openMenuId, setOpenMenuId] = useState(null);

  // Stores channel videos
  const [videos, setVideos] = useState([]);

  // Tracks loading state
  const [loading, setLoading] = useState(true);

  // Fetch videos when uploader changes
  useEffect(() => {
    fetchVideos();
  }, [uploader]);

  // Get videos from API
  const fetchVideos = async () => {
    try {
      // Fetch videos uploaded by channel
      const res = await getChannelVideos(uploader);

      // Update videos state
      setVideos(res.data);
    } catch (error) {
      // Handle API errors
      console.log(error.response?.data || error.message);
    } finally {
      // Hide loader after fetching completes
      setLoading(false);
    }
  };

  // Display loader during API request
  if (loading) {
    return <Loader />;
  }

  // Display empty state when no videos exist
  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <h2 className="text-gray-500 text-lg">No videos uploaded yet.</h2>
      </div>
    );
  }

  // Render uploaded videos grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {videos.map((video) => (
        // Render each video card
        <ChannelVideo
          key={video._id}
          video={video}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
        />
      ))}
    </div>
  );
};

export default ChannelVideosGrid;