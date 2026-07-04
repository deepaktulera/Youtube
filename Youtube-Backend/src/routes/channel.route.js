import express from "express";
import {
  createChannel,
  deleteChannel,
  showChannel,
  updateChannel,
} from "../controllers/channel.controller.js";

const router = express.Router();

router.get("/channel/:username", showChannel);
router.post("/channel", createChannel);
router.patch("/channel/:id", updateChannel);
router.delete("/channel/:id", deleteChannel);

export default router;
