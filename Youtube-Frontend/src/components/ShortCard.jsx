function ShortCard({ short }) {
  return (
    <div className="flex justify-center items-center w-full h-screen">
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
