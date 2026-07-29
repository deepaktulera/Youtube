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
import upload from "../middleware/multer.js";

import { verifyToken } from "../middleware/verifyToken.js";

// Create router
const router = express.Router();

// Get all videos
router.get("/videos", fetchVideos);

// Upload new video
router.post(
  "/video/upload",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  uploadVideo
);

// Get single video by ID
router.get("/video/:id", fetchVideo);

// Get videos of a specific channel
router.get("/videos/channel/:uploader", getChannelVideos);

// Update video details (Protected route)
router.patch("/video/:id", verifyToken, updateVideo);

// Delete video (Protected route)
router.delete("/video/:id", verifyToken, deleteVideo);

// Like or unlike video (Protected route)
router.put("/video/:id/like", verifyToken, likeVideo);

// Update video views (Protected route)
router.put("/video/:id/views", verifyToken, updateViews);

// Dislike or remove dislike from video (Protected route)
router.put("/video/:id/dislike", verifyToken, dislikeVideo);

// Export video router
export default router;