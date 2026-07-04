import express from "express";
import {
  createChannel,
  deleteChannel,
  showChannel,
  updateChannel,
} from "../controllers/channel.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/channel/:username", showChannel);

router.post("/channel/:username", verifyToken, createChannel);

router.patch("/channel/:id", verifyToken, updateChannel);

router.delete("/channel/:id", verifyToken, deleteChannel);

export default router;
