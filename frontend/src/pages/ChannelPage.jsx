// src/pages/ChannelPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const ChannelPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/channels/${id}`);
        const data = await res.json();
        setChannel(data);
        setSubscriberCount(data.subscribers || 0);

        // Fetch videos by this channel
        const res2 = await fetch("http://localhost:5000/api/videos");
        const allVideos = await res2.json();
        const myVideos = allVideos.filter((v) => v.userId === data.userId);
        setVideos(myVideos);

        // Check if user is subscribed
        if (token && user) {
          const subRes = await fetch(
            `http://localhost:5000/api/interact/check-subscription/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (subRes.ok) {
            const subData = await subRes.json();
            setSubscribed(subData.subscribed);
          }
        }
      } catch (err) {
        console.error("Error fetching channel:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChannelData();
  }, [id]);

  const handleSubscribe = async () => {
    if (!token) {
      alert("Please log in to subscribe!");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/interact/subscribe/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setSubscribed(data.subscribed);
      setSubscriberCount(data.subscribers);
    } catch (err) {
      console.error("Subscribe error:", err);
    }
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/videos/${videoId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setVideos(videos.filter((v) => v._id !== videoId));
        alert("✅ Video deleted successfully!");
      } else {
        const err = await res.json();
        alert(`❌ Failed to delete: ${err.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!channel) return <p>Channel not found.</p>;

  return (
    <div style={styles.container}>
      <div style={styles.banner}></div>

      <div style={styles.header}>
        <div>
          <h1 style={styles.channelName}>{channel.name}</h1>
          <p style={styles.handle}>@{channel.handle}</p>
          <p style={styles.subscribers}>{subscriberCount} subscribers</p>
        </div>

        {user && user._id === channel.userId ? (
          <Link to="/upload" style={styles.uploadBtn}>➕ Upload Video</Link>
        ) : (
          <button
            onClick={handleSubscribe}
            style={{
              ...styles.subscribeBtn,
              background: subscribed ? "#909090" : "#cc0000",
            }}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </div>

      <p style={styles.description}>{channel.description}</p>

      <h2 style={{ marginTop: "30px" }}>Videos</h2>
      {videos.length === 0 ? (
        <p>No videos uploaded yet.</p>
      ) : (
        <div style={styles.videoGrid}>
          {videos.map((v) => (
            <div key={v._id} style={styles.card}>
              <img
                src={v.thumbnailUrl}
                alt={v.title}
                style={styles.thumbnail}
                onClick={() => navigate(`/video/${v._id}`)}
              />
              <div style={styles.cardBody}>
                <h3 style={styles.videoTitle}>{v.title}</h3>
                <p style={styles.videoStats}>
                  {v.views} views • {new Date(v.createdAt).toLocaleDateString()}
                </p>

                {/* ✅ Show edit/delete for owner */}
                {user && user._id === channel.userId && (
                  <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    <button
                      onClick={() => navigate(`/edit-video/${v._id}`)}
                      style={styles.editBtn}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      style={styles.deleteBtn}
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "1100px", margin: "0 auto" },
  banner: {
    height: "180px",
    background: "linear-gradient(90deg, rgba(255,0,0,0.8), rgba(255,100,0,0.6))",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  channelName: { fontSize: "24px", marginBottom: "5px" },
  handle: { color: "#777" },
  subscribers: { color: "#555", fontSize: "14px" },
  uploadBtn: {
    background: "#cc0000",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  subscribeBtn: {
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  description: { color: "#555", marginTop: "15px" },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  thumbnail: { width: "100%", height: "160px", objectFit: "cover", cursor: "pointer" },
  cardBody: { padding: "10px" },
  videoTitle: { fontSize: "16px", fontWeight: "600" },
  videoStats: { fontSize: "13px", color: "#888" },
  editBtn: {
    background: "#0f9d58",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#d93025",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChannelPage;
