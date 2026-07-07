import React from "react";
import ShortCard from "../components/ShortCard";

// Shorts page that displays all short videos
function Shorts() {
  // Static list of shorts
  const shorts = [
    {
      id: 1,
      title: "React Tips",
      videoUrl: "/videos/react-tips.mp4",
      views: "10K",
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll">
      {/* Render all available shorts */}
      {shorts.map((short) => (
        <ShortCard key={short.id} short={short} />
      ))}
    </div>
  );
}

export default Shorts;