import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Loader from "./Loader";
import { getAllVideos } from "../services/videoService";

// Displays all videos on the home page
const VideoGrid = ({ category, search }) => {
  // Store fetched videos
  const [videos, setVideos] = useState([]);

  // Track loading status
  const [loading, setLoading] = useState(true);

  // Fetch videos when component loads
  useEffect(() => {
    fetchVideos();
  }, []);

  // Get videos from backend
  const fetchVideos = async () => {
    try {
      const res = await getAllVideos();

      // Update videos state
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      // Stop loading after API response
      setLoading(false);
    }
  };

  // Filter videos by category and search text
  const filteredVideos = videos.filter((video) => {
    // Check selected category
    const categoryMatch = category === "All" || video.category === category;

    // Check search keyword
    const searchMatch = video.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Show loader while fetching videos
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
      {filteredVideos.length > 0 ? (
        // Render filtered video cards
        filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))
      ) : (
        // Display empty state when no videos are found
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
