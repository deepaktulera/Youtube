import React, { useState } from "react";
import CategoryBar from "../components/CategoryBar";
import VideoGrid from "../components/VideoGrid";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="sticky top-10 w-full overflow-y-auto">
      <CategoryBar category={category} setCategory={setCategory} />
      <VideoGrid category={category} />
    </div>
  );
};

export default Home;
