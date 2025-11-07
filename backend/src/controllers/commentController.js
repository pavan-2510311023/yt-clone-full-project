import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// ✅ Create a new comment
export const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    if (!text || !videoId) {
      return res.status(400).json({ message: "Video ID and text are required" });
    }

    const newComment = new Comment({
      videoId,
      userId: req.user.id,
      userName: req.user.name,
      text,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all comments for a video
export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update (edit) a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = req.body.text;
    const updated = await comment.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
