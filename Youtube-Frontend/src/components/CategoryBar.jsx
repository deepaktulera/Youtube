import React from "react";

// Available video categories
const categories = [
  "All",
  "Music",
  "Gaming",
  "News",
  "Sports",
  "Education",
  "Programming",
  "Entertainment",
];

// Category filter bar component
const CategoryBar = ({ category, setCategory }) => {
  return (
    // Fixed category bar at the top
    <div className="fixed top-14 left-0 right-0 z-40 bg-white flex justify-center">
      <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap px-4 py-3 scrollbar-hide">
        {/* Display category buttons */}
        {categories.map((item) => {
          // Check active category
          const isActive = item === category;

          return (
            <button
              key={item}
              type="button"
              // Change selected category
              onClick={() => setCategory(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;