import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import interactRoutes from "./routes/interactRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/interact", interactRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// --- Connect to MongoDB ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- Start the server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
