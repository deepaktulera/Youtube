const categories = [
  "Music",
  "Gaming",
  "Live",
  "News",
  "Sports",
  "Podcasts",
  "Movies",
];

const CategoryBar = () => {
  return (
    <div className="flex gap-3 overflow-x-auto p-3">
      {categories.map((category) => (
        <button
          key={category}
          className="px-3 py-1 rounded-lg bg-gray-100 focus:bg-gray-500 whitespace-nowrap"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;