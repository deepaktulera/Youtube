import express from "express";
import {
  fetchVideos,
  fetchVideo,
  uploadVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/video.controller.js";

const router = express.Router();

router.get("/videos", fetchVideos);
router.post("/video/upload", uploadVideo);
router.get("/video/:id", fetchVideo);
router.patch("/video/:id", updateVideo);
router.delete("/video/:id", deleteVideo);

export default router;
