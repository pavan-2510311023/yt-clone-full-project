import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !thumbnailUrl || !videoUrl) {
      alert("⚠️ Please fill in all required fields!");
      return;
    }
    if (!isValidURL(thumbnailUrl) || !isValidURL(videoUrl)) {
      alert("⚠️ Please enter valid URLs for Thumbnail and Video!");
      return;
    }

    setLoading(true);
    simulateProgress();

    try {
      const res = await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          thumbnailUrl,
          videoUrl,
          userId: user._id,
          channelName: user.username,
        }),
      });

      if (res.ok) {
        setUploadProgress(100);
        setTimeout(() => {
          alert("✅ Video uploaded successfully!");
          navigate("/channel");
        }, 800);
      } else {
        const err = await res.json();
        alert(`❌ Upload failed: ${err.message}`);
      }
    } catch (err) {
      console.error("Error uploading video:", err);
      alert("❌ Server error while uploading video.");
    } finally {
      setTimeout(() => setLoading(false), 1200);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "30px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Upload a Video</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label><strong>Title*</strong></label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        <div>
          <label><strong>Description</strong></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        <div>
          <label><strong>Thumbnail URL*</strong></label>
          <input
            type="text"
            value={thumbnailUrl}
            onChange={(e) => {
              setThumbnailUrl(e.target.value);
              setPreviewError(false);
            }}
            placeholder="Enter thumbnail image URL"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
          {thumbnailUrl && !previewError && (
            <img
              src={thumbnailUrl}
              alt="Thumbnail preview"
              onError={() => setPreviewError(true)}
              style={{
                width: "100%",
                marginTop: "15px",
                borderRadius: "8px",
                maxHeight: "200px",
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />
          )}
          {previewError && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
              ⚠️ Invalid image URL. Please check again.
            </p>
          )}
        </div>

        <div>
          <label><strong>Video URL*</strong></label>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube embed or video link"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </div>

        {loading && (
          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                height: "8px",
                background: "#f0f0f0",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${uploadProgress}%`,
                  background: "#cc0000",
                  transition: "width 0.3s ease",
                }}
              ></div>
            </div>
            <p style={{ textAlign: "center", fontSize: "14px", marginTop: "6px" }}>
              {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : "Finishing up..."}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#cc0000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default CreateVideo;
