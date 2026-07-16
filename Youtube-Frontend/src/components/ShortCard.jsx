import React from "react";

// Displays a single short video card
function ShortCard({ short }) {
  return (
    // Center the short video on the screen
    <div className="flex justify-center items-center w-full h-screen">
      {/* Short video player */}
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
