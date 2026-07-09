import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./src/config/databse.js";

import authRoute from "./src/routes/auth.routes.js";
import videoRoute from "./src/routes/video.routes.js";
import channelRoute from "./src/routes/channel.routes.js";
import commentRoute from "./src/routes/comments.routes.js";

const app = express();

dotenv.config();

connectDatabase();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/auth", authRoute);
app.use("/", videoRoute);
app.use("/", channelRoute);
app.use("/comments", commentRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
