import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVideo = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Load video details
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${id}`);
        const data = await res.json();
        if (res.ok) {
          setTitle(data.title);
          setDescription(data.description);
          setVideoUrl(data.videoUrl);
          setThumbnailUrl(data.thumbnailUrl);
        } else {
          alert(data.message || "Failed to load video");
        }
      } catch (err) {
        console.error("Error loading video:", err);
      }
    };
    fetchVideo();
  }, [id]);

  // ✅ Submit updated video
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in again.");
      navigate("/login");
      return;
    }

    const updated = { title, description, videoUrl, thumbnailUrl };

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        alert("✅ Video updated successfully!");
        const user = JSON.parse(localStorage.getItem("user"));
        navigate(`/channel/${user._id}`);
      } else {
        const err = await res.json();
        alert(`❌ Update failed: ${err.message}`);
      }
    } catch (err) {
      console.error("Error updating video:", err);
      alert("Server error during update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f9f9f9", minHeight: "100vh", paddingTop: "30px" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Video</h2>

        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "15px" }}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Video URL</label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Thumbnail URL</label>
            <input
              type="url"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="Thumbnail Preview"
                style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "#0f9d58",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Video"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVideo;
