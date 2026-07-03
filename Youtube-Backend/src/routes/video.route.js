import express from "express";
import {
  fetchVideos,
  fetchVideo,
  uploadVideo,
  updateVideo,
  deleteVideo,
  getChannelVideos,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/videos", fetchVideos);
router.post("/video/upload", uploadVideo);
router.get("/video/:id", fetchVideo);
router.get("/videos/channel/:uploader", getChannelVideos);
router.patch("/video/:id",verifyToken ,  updateVideo);
router.delete("/video/:id",verifyToken , deleteVideo);

export default router;
