import ShortCard from "../components/ShortCard";

function Shorts() {
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
      {shorts.map((short) => (
        <ShortCard key={short.id} short={short} />
      ))}
    </div>
  );
}

export default Shorts;