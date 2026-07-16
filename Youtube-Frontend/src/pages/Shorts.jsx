import React from "react";
import ShortCard from "../components/ShortCard";

// Page component for displaying short videos
function Shorts() {
  // Store available short videos
  const shorts = [
    {
      id: 1,
      title: "React Tips",
      videoUrl: "/videos/react-tips.mp4",
      views: "10K",
    },
  ];

  return (
    // Shorts page container with vertical scrolling
    <div className="h-screen overflow-y-scroll">
      {/* Display each short video card */}
      {shorts.map((short) => (
        <ShortCard key={short.id} short={short} />
      ))}
    </div>
  );
}

export default Shorts;