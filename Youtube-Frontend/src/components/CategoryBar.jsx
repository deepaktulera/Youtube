import { useState } from "react";

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
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex w-full fixed z-50 bg-white md:justify-center gap-3 overflow-x-auto p-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={`px-3 py-1 rounded-lg whitespace-nowrap transition-colors ${
            selected === category
              ? "bg-black text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;