import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ✅ list of subscribers
  },
  { timestamps: true }
);

export default mongoose.model("Channel", channelSchema);
