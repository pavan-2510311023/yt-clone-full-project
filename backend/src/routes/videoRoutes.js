// src/routes/videoRoutes.js
import express from "express";
import {
  listVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  toggleLike,
  toggleDislike,
} from "../controllers/videoController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", listVideos);
router.get("/:id", getVideo);

// Protected routes
router.post("/", verifyToken, createVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.put("/:id/like", verifyToken, toggleLike);
router.put("/:id/dislike", verifyToken, toggleDislike);

export default router;
