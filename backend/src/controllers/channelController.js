import Channel from "../models/Channel.js";
import User from "../models/User.js";

// ✅ Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { name, handle, description, channelBanner } = req.body;

    // Prevent duplicate channel per user
    const existing = await Channel.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: "You already have a channel" });
    }

    const channel = await Channel.create({
      name,
      handle,
      description,
      channelBanner,
      userId: req.user.id,
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get a channel by ID
export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate("userId", "username email");
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get a channel by user ID
export const getChannelByUser = async (req, res) => {
  try {
    const channel = await Channel.findOne({ userId: req.params.userId });
    if (!channel)
      return res.status(404).json({ message: "Channel not found for this user" });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all channels
export const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find().populate("userId", "username");
    res.json(channels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
