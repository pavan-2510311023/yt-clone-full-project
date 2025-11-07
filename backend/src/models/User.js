import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "https://via.placeholder.com/150" },
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }], // ✅ important
});

export default mongoose.models.User || mongoose.model("User", userSchema);

