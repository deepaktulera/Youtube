import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDatabase from "./src/config/databse.js";

import seedVideos from "./src/seed/seedVideos.js";

const start = async () => {
  try {
    await connectDatabase();

    await seedVideos();

    console.log("Database Seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

start();
