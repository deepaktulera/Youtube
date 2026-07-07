import React, { useState } from "react";
import CategoryBar from "../components/CategoryBar";
import VideoGrid from "../components/VideoGrid";

// Home page that displays all videos
const Home = () => {
  // Store the currently selected category
  const [category, setCategory] = useState("All");

  return (
    <div className="sticky top-10 w-full overflow-y-auto">
      {/* Category filter */}
      <CategoryBar category={category} setCategory={setCategory} />

      {/* Display videos based on the selected category */}
      <VideoGrid category={category} />
    </div>
  );
};

export default Home;
