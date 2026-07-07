import express from "express";
import {
  fetchVideos,
  fetchVideo,
  uploadVideo,
  updateVideo,
  deleteVideo,
  getChannelVideos,
  likeVideo,
  dislikeVideo,
  updateViews,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/videos", fetchVideos);
router.post("/video/upload", uploadVideo);
router.get("/video/:id", fetchVideo);
router.get("/videos/channel/:uploader", getChannelVideos);
router.patch("/video/:id", verifyToken, updateVideo);
router.delete("/video/:id", verifyToken, deleteVideo);
router.put("/video/:id/like", verifyToken, likeVideo);
router.put("/video/:id/views", verifyToken ,  updateViews);
router.put("/video/:id/dislike", verifyToken, dislikeVideo);

export default router;
