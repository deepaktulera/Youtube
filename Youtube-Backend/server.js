import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./src/config/databse.js";

import authRoute from "./src/routes/auth.routes.js";
import videoRoute from "./src/routes/video.routes.js";
import channelRoute from "./src/routes/channel.routes.js";
import commentRoute from "./src/routes/comments.routes.js";

// Create express application
const app = express();

// Load environment variables
dotenv.config();

// Connect to database
connectDatabase();

// Parse JSON request data
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Define routes

// Authentication routes
app.use("/auth", authRoute);

// Video routes
app.use("/", videoRoute);

// Channel routes
app.use("/", channelRoute);

// Comment routes
app.use("/comments", commentRoute);

// Get server port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});