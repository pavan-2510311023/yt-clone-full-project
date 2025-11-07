import Video from "../models/Video.js";
import User from "../models/User.js";

// 👍 Like a video
export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (!video.likes.includes(req.user.id)) {
      video.likes.push(req.user.id);
      video.dislikes = video.dislikes.filter((id) => id.toString() !== req.user.id);
    } else {
      video.likes = video.likes.filter((id) => id.toString() !== req.user.id);
    }

    await video.save();
    res.json({ message: "Like updated", likes: video.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👎 Dislike a video
export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (!video.dislikes.includes(req.user.id)) {
      video.dislikes.push(req.user.id);
      video.likes = video.likes.filter((id) => id.toString() !== req.user.id);
    } else {
      video.dislikes = video.dislikes.filter((id) => id.toString() !== req.user.id);
    }

    await video.save();
    res.json({ message: "Dislike updated", dislikes: video.dislikes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔔 Subscribe or unsubscribe a channel
export const subscribeChannel = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const channelId = req.params.channelId;

    if (!user.subscriptions) user.subscriptions = [];

    if (!user.subscriptions.includes(channelId)) {
      user.subscriptions.push(channelId);
      await user.save();
      res.json({ message: "Subscribed successfully" });
    } else {
      user.subscriptions = user.subscriptions.filter((id) => id.toString() !== channelId);
      await user.save();
      res.json({ message: "Unsubscribed successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
