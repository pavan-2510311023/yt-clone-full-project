import React from "react";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate to /watch/:id, passing full video data for Watch page
    navigate(`/watch/${video._id || video.videoId}`, { state: { video } });
  };

  return (
    <div
      className="video-card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "280px",
      }}
    >
      <img
        src={
          video.thumbnailUrl ||
          "https://via.placeholder.com/280x160?text=No+Thumbnail"
        }
        alt={video.title}
        style={{
          width: "100%",
          height: "160px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            margin: 0,
            lineHeight: "1.2",
          }}
        >
          {video.title}
        </h3>

        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          {video.uploader?.username || video.uploader || "Unknown Channel"}
        </p>

        <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
          {video.views?.toLocaleString() || 0} views •{" "}
          {video.uploadDate
            ? new Date(video.uploadDate).toLocaleDateString()
            : "No date"}
        </p>
      </div>
    </div>
  );
}
