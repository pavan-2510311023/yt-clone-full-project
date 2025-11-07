import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "../models/video.model.js"; // ensure this path is correct

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ytclone";

const sampleVideos = [
  {
    title: "Learn React in 30 Minutes",
    description: "A quick tutorial to get started with React.",
    thumbnailUrl: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Education",
    uploader: "user01",
    views: 15200,
    likes: 1023,
    uploadDate: new Date("2024-09-20"),
  },
  {
    title: "Top 10 Funny Gaming Moments",
    description: "Laugh out loud with these epic gaming fails.",
    thumbnailUrl: "https://i.ytimg.com/vi/2g811Eo7K8U/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Gaming",
    uploader: "user02",
    views: 27400,
    likes: 1950,
    uploadDate: new Date("2024-09-25"),
  },
  {
    title: "Breaking Tech News: AI Revolution",
    description: "A discussion about the latest AI trends.",
    thumbnailUrl: "https://i.ytimg.com/vi/rrT6v5sOwJg/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "News",
    uploader: "user03",
    views: 9800,
    likes: 540,
    uploadDate: new Date("2024-10-02"),
  },
  {
    title: "Top 5 JavaScript Tricks You Didn’t Know",
    description: "Hidden JS features explained in minutes.",
    thumbnailUrl: "https://i.ytimg.com/vi/PoRJizFvM7s/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Education",
    uploader: "user04",
    views: 11000,
    likes: 870,
    uploadDate: new Date("2024-10-05"),
  },
  {
    title: "Relaxing Music Mix 2024",
    description: "Peaceful instrumental mix for relaxation and focus.",
    thumbnailUrl: "https://i.ytimg.com/vi/2OEL4P1Rz04/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Music",
    uploader: "user05",
    views: 45800,
    likes: 2900,
    uploadDate: new Date("2024-10-07"),
  },
  {
    title: "Stand-Up Comedy Night Highlights",
    description: "Funniest moments from this week’s comedy show.",
    thumbnailUrl: "https://i.ytimg.com/vi/hY7m5jjJ9mM/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Comedy",
    uploader: "user06",
    views: 37200,
    likes: 3120,
    uploadDate: new Date("2024-10-09"),
  },
  {
    title: "Epic Guitar Solo Challenge",
    description: "Watch musicians compete with mind-blowing solos.",
    thumbnailUrl: "https://i.ytimg.com/vi/1w7OgIMMRc4/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Music",
    uploader: "user07",
    views: 18900,
    likes: 1500,
    uploadDate: new Date("2024-10-11"),
  },
  {
    title: "Pro Gamer Setup Tour",
    description: "A sneak peek at an eSports player's ultimate setup.",
    thumbnailUrl: "https://i.ytimg.com/vi/tAGnKpE4NCI/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Gaming",
    uploader: "user08",
    views: 22500,
    likes: 1800,
    uploadDate: new Date("2024-10-12"),
  },
  {
    title: "Daily World News Recap",
    description: "Your 5-minute summary of today’s top stories.",
    thumbnailUrl: "https://i.ytimg.com/vi/lTTajzrSkCw/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "News",
    uploader: "user09",
    views: 8700,
    likes: 430,
    uploadDate: new Date("2024-10-13"),
  },
  {
    title: "How to Build a MERN Stack App",
    description: "Full-stack tutorial covering MongoDB, Express, React, Node.js.",
    thumbnailUrl: "https://i.ytimg.com/vi/ktjafK4SgWM/hqdefault.jpg",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    category: "Education",
    uploader: "user10",
    views: 32000,
    likes: 2200,
    uploadDate: new Date("2024-10-14"),
  },
];

async function seedVideos() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");

    await Video.deleteMany({});
    await Video.insertMany(sampleVideos);

    console.log("🌱 10 Sample videos inserted successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedVideos();
