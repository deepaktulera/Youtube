function ShortCard({ short }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full flex justify-center items-center">
        <video src={short.videoUrl} controls className="h-[70%] object-cover" />
      </div>
    </div>
  );
}

export default ShortCard;
