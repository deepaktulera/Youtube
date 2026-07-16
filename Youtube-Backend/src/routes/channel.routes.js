import express from "express";
import {
  createChannel,
  deleteChannel,
  showChannel,
  updateChannel,
} from "../controllers/channel.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

// Create router
const router = express.Router();

// Get channel details by username
router.get("/channel/:username", showChannel);

// Create new channel (Protected route)
router.post("/channel/:username", verifyToken, createChannel);

// Update channel details (Protected route)
router.patch("/channel/:username", verifyToken, updateChannel);

// Delete channel (Protected route)
router.delete("/channel/:id", verifyToken, deleteChannel);

// Export channel router
export default router;