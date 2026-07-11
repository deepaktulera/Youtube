import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CategoryBar from "../components/CategoryBar";
import VideoGrid from "../components/VideoGrid";

const Home = () => {
  const [category, setCategory] = useState("All");

  // Receive search from HomeLayout
  const { search } = useOutletContext();

  return (
    <div className="sticky top-10 w-full overflow-y-auto">
      <CategoryBar
        category={category}
        setCategory={setCategory}
      />

      <VideoGrid
        category={category}
        search={search}
      />
    </div>
  );
};

export default Home;