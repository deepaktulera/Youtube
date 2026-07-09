import express from "express";

import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/:id", verifyToken, addComment);

router.get("/:id", getComments);

router.put("/:id", verifyToken, updateComment);

router.delete("/:id", verifyToken, deleteComment);

export default router;