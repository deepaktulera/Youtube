import express from "express";

import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

// Create router
const router = express.Router();

// Add comment to video (Protected route)
router.post("/:id", verifyToken, addComment);

// Get all comments of video
router.get("/:id", getComments);

// Update comment (Protected route)
router.put("/:id", verifyToken, updateComment);

// Delete comment (Protected route)
router.delete("/:id", verifyToken, deleteComment);

// Export comment router
export default router;