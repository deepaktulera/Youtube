import React from "react";

// Displays a single short video
function ShortCard({ short }) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      {/* Short Video Player */}
      <video
        src={short.videoUrl}
        controls
        muted
        className="h-[75%] rounded-xl object-cover"
      />
    </div>
  );
}

export default ShortCard;
