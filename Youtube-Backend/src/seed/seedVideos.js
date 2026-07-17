import Video from "../models/Video.js";
import dummyVideos from "../data/dummyData.js";

const seedVideos = async () => {
  try {
    await Video.deleteMany();

    await Video.insertMany(dummyVideos);

    console.log("Dummy videos inserted successfully");
  } catch (error) {
    console.log(error);
  }
};

export default seedVideos;
