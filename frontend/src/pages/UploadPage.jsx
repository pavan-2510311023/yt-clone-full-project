import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !videoUrl) {
      alert("Please provide a title and video URL");
      return;
    }

    try {
      setUploading(true);
      const res = await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, videoUrl, thumbnailUrl }),
      });

      if (res.ok) {
        setSuccess(true);
        setTitle("");
        setDescription("");
        setVideoUrl("");
        setThumbnailUrl("");
      } else {
        const err = await res.json();
        alert(`❌ Upload failed: ${err.message}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Server error during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🎬 Upload New Video</h2>

      {success ? (
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "#0f9d58" }}>✅ Video uploaded successfully!</h3>
          <button
            onClick={() => navigate("/channel")}
            style={{
              marginTop: "15px",
              background: "#065fd4",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Go to My Channel
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpload}>
          {/* Video Title */}
          <label style={{ fontWeight: "bold" }}>Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />

          {/* Video Description */}
          <label style={{ fontWeight: "bold" }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a video description"
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
              resize: "none",
            }}
          ></textarea>

          {/* Video URL */}
          <label style={{ fontWeight: "bold" }}>Video URL (YouTube or Embed)</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste your video link here"
            required
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />

          {/* Thumbnail URL */}
          <label style={{ fontWeight: "bold" }}>Thumbnail URL (Optional)</label>
          <input
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="Paste a thumbnail image link"
            style={{
              width: "100%",
              padding: "10px",
              margin: "8px 0 20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
          />

          {/* Video Preview */}
          {videoUrl && (
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <iframe
                width="100%"
                height="400"
                src={videoUrl}
                title="Video Preview"
                frameBorder="0"
                allowFullScreen
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              ></iframe>
            </div>
          )}

          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading}
            style={{
              width: "100%",
              background: uploading ? "#ccc" : "#cc0000",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: uploading ? "not-allowed" : "pointer",
              fontWeight: "bold",
            }}
          >
            {uploading ? "⏳ Uploading..." : "📤 Upload Video"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadPage;
