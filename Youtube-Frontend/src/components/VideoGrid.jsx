import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Loader from "./Loader";
import { getAllVideos } from "../services/videoService";

// Component to display all videos on the home page
const VideoGrid = ({ category, search }) => {
  // Store all fetched videos
  const [videos, setVideos] = useState([]);

  // Controls the loading state
  const [loading, setLoading] = useState(true);

  // Fetch videos when the component mounts
  useEffect(() => {
    fetchVideos();
  }, []);

  // Fetch all videos from the backend
  const fetchVideos = async () => {
    try {
      const res = await getAllVideos();

      // Save videos into state
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      // Hide loader after request completes
      setLoading(false);
    }
  };

  // Filter videos based on selected category
  const filteredVideos = videos.filter((video) => {
    const categoryMatch =
      category === "All" || video.category === category;

    const searchMatch = video.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Display loader while videos are loading
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pt-16">
      {filteredVideos.length > 0 ? (
        // Display filtered videos
        filteredVideos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))
      ) : (
        // Show message when no videos match the selected category
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