// src/pages/Home.jsx
import React, { useEffect, useState } from "react";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  const fetchVideos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/videos");
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setVideos(result.data);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };
  fetchVideos();
}, []);


  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {videos.length === 0 ? (
        <p style={{ textAlign: "center", width: "100%" }}>
          No videos available. Please upload one!
        </p>
      ) : (
        videos.map((video) => (
          <div
            key={video._id}
            style={{
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = `/video/${video._id}`)}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h3 style={{ fontSize: "16px", margin: "10px 0" }}>
                {video.title}
              </h3>
              <p style={{ fontSize: "13px", color: "#606060", margin: 0 }}>
                {video.channelName}
              </p>
              <p style={{ fontSize: "12px", color: "#909090" }}>
                {video.views || 0} views •{" "}
                {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
