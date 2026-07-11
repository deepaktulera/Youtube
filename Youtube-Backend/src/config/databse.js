import mongoose from "mongoose";

// function for connect mongo db database
const connectDatabase = async () => {
  try {
    // connect database with local mongodb
    await mongoose.connect("mongodb://localhost:27017/Youtube"
    );

    // database connected message
    console.log("MongoDB Connected");
  } catch (error) {
    // if database not connect then show error
    console.error(`MongoDB Connection Error: ${error.message}`);

    // stop server if db connection fail
    process.exit(1);
  }
};

export default connectDatabase;