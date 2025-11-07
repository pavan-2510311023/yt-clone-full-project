import Video from "../models/Video.js";

// ✅ Utility for consistent responses
const respond = (res, status, success, message, data = null) => {
  return res.status(status).json({ success, message, data });
};

// 📋 Get all videos (public)
export const listVideos = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== "All") query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .select("title thumbnailUrl views likes category createdAt channelName");

    if (!videos || videos.length === 0)
      return respond(res, 404, false, "No videos found");

    return respond(res, 200, true, "Videos fetched successfully", videos);
  } catch (err) {
    console.error("List Videos Error:", err);
    return respond(res, 500, false, "Server error fetching videos");
  }
};

// 🔍 Get a single video by ID (public)
export const getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("userId", "username email");

    if (!video)
      return respond(res, 404, false, "Video not found");

    // Increment view count
    video.views += 1;
    await video.save();

    return respond(res, 200, true, "Video fetched successfully", video);
  } catch (err) {
    console.error("Get Video Error:", err);
    return respond(res, 500, false, "Server error fetching video");
  }
};

// 🆕 Create a new video (protected)
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category } = req.body;

    // Validation
    if (!title || !videoUrl)
      return respond(res, 400, false, "Title and video URL are required");

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category: category || "General",
      channelName: req.body.channelName || "Unknown Channel",
      userId: req.user.id,
    });

    return respond(res, 201, true, "Video uploaded successfully", video);
  } catch (err) {
    console.error("Create Video Error:", err);
    return respond(res, 500, false, "Server error creating video");
  }
};

// ✏️ Update video (protected)
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);
    if (!video) return respond(res, 404, false, "Video not found");

    // Ownership check
    if (video.userId.toString() !== req.user.id)
      return respond(res, 403, false, "You are not authorized to edit this video");

    const updated = await Video.findByIdAndUpdate(id, req.body, { new: true });
    return respond(res, 200, true, "Video updated successfully", updated);
  } catch (err) {
    console.error("Update Video Error:", err);
    return respond(res, 500, false, "Server error updating video");
  }
};

// ❌ Delete video (protected)
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return respond(res, 404, false, "Video not found");

    // Ownership check
    if (video.userId.toString() !== req.user.id)
      return respond(res, 403, false, "You are not authorized to delete this video");

    await Video.findByIdAndDelete(id);
    return respond(res, 200, true, "Video deleted successfully");
  } catch (err) {
    console.error("Delete Video Error:", err);
    return respond(res, 500, false, "Server error deleting video");
  }
};

// 👍 Toggle Like (protected)
export const toggleLike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return respond(res, 404, false, "Video not found");

    const userId = req.user.id;
    const liked = video.likes.includes(userId);

    if (liked) {
      video.likes = video.likes.filter(id => id.toString() !== userId);
    } else {
      video.likes.push(userId);
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    }

    await video.save();
    return respond(res, 200, true, "Like status updated", { likes: video.likes.length });
  } catch (err) {
    console.error("Like Video Error:", err);
    return respond(res, 500, false, "Server error toggling like");
  }
};

// 👎 Toggle Dislike (protected)
export const toggleDislike = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return respond(res, 404, false, "Video not found");

    const userId = req.user.id;
    const disliked = video.dislikes.includes(userId);

    if (disliked) {
      video.dislikes = video.dislikes.filter(id => id.toString() !== userId);
    } else {
      video.dislikes.push(userId);
      video.likes = video.likes.filter(id => id.toString() !== userId);
    }

    await video.save();
    return respond(res, 200, true, "Dislike status updated", { dislikes: video.dislikes.length });
  } catch (err) {
    console.error("Dislike Video Error:", err);
    return respond(res, 500, false, "Server error toggling dislike");
  }
};
