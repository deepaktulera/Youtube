const Loader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-4 pt-16 animate-pulse">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <div className="w-full aspect-video bg-gray-300 rounded-xl"></div>

          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>

            <div className="flex-1 space-y-2">
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
              <div className="h-3 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
