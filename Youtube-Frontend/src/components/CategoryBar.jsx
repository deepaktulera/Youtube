import React, { useState } from "react";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Live",
  "News",
  "Sports",
  "Podcasts",
  "Movies",
];

const CategoryBar = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // Later you can filter videos here
    // console.log(category);
  };

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-white flex justify-center">
      <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap px-4 py-3 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
