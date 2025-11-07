import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${id}`);
        const data = await res.json();
        setVideo(data);
      } catch (err) {
        console.error("Error loading video:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in first!");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`http://localhost:5000/api/videos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(video),
      });

      if (res.ok) {
        alert("✅ Video updated successfully!");
        navigate("/channel/" + video.userId);
      } else {
        const err = await res.json();
        alert("❌ Update failed: " + err.message);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Server error while updating video.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading video...</p>;
  if (!video) return <p>Video not found.</p>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        gap: "40px",
      }}
    >
      {/* LEFT — Form */}
      <form
        onSubmit={handleSubmit}
        style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <h2>Edit Video Details</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={video.title}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={video.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          style={inputStyle}
        />

        <label>Thumbnail URL</label>
        <input
          type="url"
          name="thumbnailUrl"
          value={video.thumbnailUrl}
          onChange={handleChange}
          placeholder="Thumbnail URL"
          style={inputStyle}
        />

        <label>Video URL</label>
        <input
          type="url"
          name="videoUrl"
          value={video.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#0f9d58",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* RIGHT — Preview */}
      <div style={{ flex: 1, textAlign: "center" }}>
        <h3>Live Preview</h3>

        {/* Thumbnail Preview */}
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt="Thumbnail Preview"
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "180px",
              background: "#eee",
              borderRadius: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
            }}
          >
            No Thumbnail
          </div>
        )}

        {/* Video Preview */}
        {video.videoUrl ? (
          <video
            width="100%"
            height="220"
            controls
            style={{ borderRadius: "10px" }}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            style={{
              width: "100%",
              height: "220px",
              background: "#000",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
            }}
          >
            No Video Preview
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

export default EditVideoPage;
