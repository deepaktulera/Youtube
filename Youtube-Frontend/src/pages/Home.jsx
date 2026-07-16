import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import VideoGrid from "../components/VideoGrid";

// Home page component
const Home = () => {
  // Store selected video category
  const [category, setCategory] = useState("All");

  // Get search value from layout
  const { search } = useOutletContext();

  return (
    // Home page content container
    <div className="sticky top-10 w-full overflow-y-auto">
      {/* Category filter bar */}
      <CategoryBar
        category={category}
        setCategory={setCategory}
      />

      {/* Display filtered videos */}
      <VideoGrid
        category={category}
        search={search}
      />
    </div>
  );
};

export default Home;