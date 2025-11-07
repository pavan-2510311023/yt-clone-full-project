import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  likeVideo,
  dislikeVideo,
  subscribeChannel,
} from "../controllers/interactController.js";
import User from "../models/User.js";

const router = express.Router();

router.put("/like/:id", verifyToken, likeVideo);
router.put("/dislike/:id", verifyToken, dislikeVideo);
router.put("/subscribe/:channelId", verifyToken, subscribeChannel);

// ✅ NEW ROUTE — Check if user is subscribed to a channel
router.get("/check-subscription/:channelId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const isSubscribed = user.subscriptions.includes(req.params.channelId);
    res.json({ subscribed: isSubscribed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
