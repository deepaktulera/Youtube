import CategoryBar from "../components/CategoryBar";
import VideoGrid from "../components/VideoGrid";

const Home = () => {
  return (
    <div className="sticky top-10 w-full overflow-y-auto">
      <CategoryBar/>
      <VideoGrid />
    </div>
  );
};
export default Home;
