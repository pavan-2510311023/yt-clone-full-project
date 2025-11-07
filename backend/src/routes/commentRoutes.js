import express from "express";
import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Add new comment
router.post("/", verifyToken, addComment);

// Get comments for a video
router.get("/video/:videoId", getCommentsByVideo);

// Edit comment
router.put("/:id", verifyToken, updateComment);

// Delete comment
router.delete("/:id", verifyToken, deleteComment);

export default router;
