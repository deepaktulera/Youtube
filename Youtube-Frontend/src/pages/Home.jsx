import { useEffect, useState } from "react";
import CategoryBar from "../components/CategoryBar";
import VideoGrid from "../components/VideoGrid";
import Loader from "../components/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sticky top-10 w-full overflow-y-auto">
      <CategoryBar />
      {loading ? <Loader /> : <VideoGrid />}
    </div>
  );
};

export default Home;
