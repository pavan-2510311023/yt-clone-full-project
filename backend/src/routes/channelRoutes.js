import express from "express";
import {
  createChannel,
  getChannel,
  getChannelByUser,
  getAllChannels,
} from "../controllers/channelController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Order matters — define specific routes first
router.get("/", getAllChannels); // ✅ Fetch all channels
router.get("/user/:userId", getChannelByUser); // ✅ Get channel by user ID
router.get("/:id", getChannel); // ✅ Get single channel by channel ID

router.post("/", verifyToken, createChannel); // ✅ Protected route

export default router;
