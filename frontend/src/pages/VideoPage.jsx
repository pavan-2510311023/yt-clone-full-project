import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const VideoPage = () => {
  const { id: videoId } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch video, comments, suggested videos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await fetch(`http://localhost:5000/api/videos/${videoId}`);
        const videoData = await videoRes.json();
        setVideo(videoData);
        setLikes(videoData.likes?.length || 0);
        setDislikes(videoData.dislikes?.length || 0);

        if (user) {
          setUserLiked(videoData.likes?.includes(user._id));
          setUserDisliked(videoData.dislikes?.includes(user._id));
        }

        // ✅ Fetch channel info to check if user is subscribed
        if (videoData?.userId && user) {
          const channelRes = await fetch(`http://localhost:5000/api/channels/${videoData.userId}`);
          const channelData = await channelRes.json();
          if (channelData?.subscribers?.includes(user._id)) {
            setSubscribed(true);
          }
        }

        const commentsRes = await fetch(
          `http://localhost:5000/api/comments/video/${videoId}`
        );
        const commentData = await commentsRes.json();
        setComments(commentData);

        const suggestedRes = await fetch("http://localhost:5000/api/videos");
const suggestedData = await suggestedRes.json();
if (suggestedData.success && Array.isArray(suggestedData.data)) {
  setSuggestedVideos(suggestedData.data.filter((v) => v._id !== videoId));
}

      } catch (err) {
        console.error("Error loading video page:", err);
      }
    };

    fetchData();
  }, [videoId]);

  // ✅ Like / Dislike
  const handleLike = async () => {
    if (!token) return alert("Please sign in to like videos!");
    try {
      const res = await fetch(`http://localhost:5000/api/interact/like/${videoId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setLikes(data.likes);
      setUserLiked(!userLiked);
      setUserDisliked(false);
    } catch (err) {
      console.error("Error liking video:", err);
    }
  };

  const handleDislike = async () => {
    if (!token) return alert("Please sign in to dislike videos!");
    try {
      const res = await fetch(`http://localhost:5000/api/interact/dislike/${videoId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDislikes(data.dislikes);
      setUserDisliked(!userDisliked);
      setUserLiked(false);
    } catch (err) {
      console.error("Error disliking video:", err);
    }
  };

  // ✅ Subscribe / Unsubscribe
  const handleSubscribe = async () => {
    if (!token) return alert("Please sign in to subscribe!");
    try {
      const res = await fetch(
        `http://localhost:5000/api/interact/subscribe/${video.userId}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      alert(data.message);
      setSubscribed((prev) => !prev);
    } catch (err) {
      console.error("Error subscribing:", err);
    }
  };

  // ✅ Comments CRUD
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ videoId, text: newComment }),
      });
      const data = await res.json();
      setComments([...comments, data]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleEditComment = async (id) => {
    if (!editedText.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editedText }),
      });
      const updated = await res.json();
      setComments(comments.map((c) => (c._id === id ? updated : c)));
      setEditingComment(null);
      setEditedText("");
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  };

  const handleDeleteComment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div style={styles.pageContainer}>
      {/* Left: Video Player + Comments */}
      <div style={styles.leftSection}>
        <div style={styles.videoWrapper}>
          <iframe
            src={video.videoUrl}
            title={video.title}
            frameBorder="0"
            allowFullScreen
            style={styles.videoFrame}
          ></iframe>
        </div>

        <h2 style={styles.videoTitle}>{video.title}</h2>
        <p style={styles.videoDesc}>{video.description}</p>

        {/* Channel Info */}
        <div style={styles.channelRow}>
          <Link
            to={`/channel/${video.userId}`}
            style={{ textDecoration: "none", color: "#065fd4", fontWeight: "bold" }}
          >
            {video.channelName}
          </Link>

          <button
            onClick={handleSubscribe}
            style={{
              ...styles.subscribeBtn,
              background: subscribed ? "#909090" : "#cc0000",
            }}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* Like & Dislike */}
        <div style={styles.actionRow}>
          <button
            onClick={handleLike}
            style={{
              ...styles.actionButton,
              color: userLiked ? "#0f9d58" : "#333",
            }}
          >
            <FaThumbsUp style={{ marginRight: "6px" }} /> {likes}
          </button>
          <button
            onClick={handleDislike}
            style={{
              ...styles.actionButton,
              color: userDisliked ? "#d93025" : "#333",
            }}
          >
            <FaThumbsDown style={{ marginRight: "6px" }} /> {dislikes}
          </button>
        </div>

        {/* Comments */}
        <div style={styles.commentSection}>
          <h3>Comments ({comments.length})</h3>
          <div style={styles.commentInputBox}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={styles.commentInput}
            />
            <button onClick={handleAddComment} style={styles.commentBtn}>
              Comment
            </button>
          </div>

          {comments.map((c) => (
            <div key={c._id} style={styles.commentCard}>
              <p>
                <strong>{c.userName}</strong>{" "}
                <span style={styles.timeStamp}>
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </p>

              {editingComment === c._id ? (
                <div>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    style={styles.editInput}
                  />
                  <div>
                    <button
                      onClick={() => handleEditComment(c._id)}
                      style={styles.saveBtn}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingComment(null)}
                      style={styles.cancelBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p>{c.text}</p>
              )}

              {c.userId === user?._id && (
                <div style={styles.commentActions}>
                  <button
                    onClick={() => {
                      setEditingComment(c._id);
                      setEditedText(c.text);
                    }}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(c._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Suggested Videos */}
      <div style={styles.rightSection}>
        <h3>Suggested Videos</h3>
        {suggestedVideos.slice(0, 6).map((v) => (
          <div
            key={v._id}
            style={styles.suggestedCard}
            onClick={() => navigate(`/video/${v._id}`)}
          >
            <img src={v.thumbnailUrl} alt={v.title} style={styles.thumbnail} />
            <div>
              <p style={styles.suggestedTitle}>{v.title}</p>
              <p style={styles.suggestedChannel}>{v.channelName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Styles ---
const styles = {
  pageContainer: { display: "flex", flexWrap: "wrap", gap: "25px", padding: "20px" },
  leftSection: { flex: "3 1 600px", minWidth: "300px" },
  rightSection: { flex: "1 1 300px", minWidth: "260px" },
  videoWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
    borderRadius: "10px",
    overflow: "hidden",
  },
  videoFrame: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" },
  videoTitle: { marginTop: 15, fontSize: "20px", fontWeight: "bold" },
  videoDesc: { color: "#555" },
  channelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
  subscribeBtn: {
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  actionRow: { display: "flex", gap: "20px", margin: "15px 0" },
  actionButton: {
    border: "none",
    background: "none",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  commentSection: { marginTop: "30px" },
  commentInputBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  commentInput: { flex: 1, padding: "10px", borderRadius: "20px", border: "1px solid #ccc" },
  commentBtn: {
    background: "#065fd4",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "10px 15px",
    cursor: "pointer",
  },
  commentCard: { borderBottom: "1px solid #ddd", padding: "10px 0" },
  timeStamp: { color: "#777", fontSize: "12px" },
  editInput: { width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" },
  saveBtn: {
    background: "#0f9d58",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    marginRight: "5px",
    cursor: "pointer",
  },
  cancelBtn: { background: "#ccc", border: "none", borderRadius: "5px", padding: "5px 10px" },
  commentActions: { display: "flex", gap: "10px", marginTop: "5px" },
  editBtn: {
    background: "#0f9d58",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#d93025",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  suggestedCard: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    cursor: "pointer",
    alignItems: "center",
  },
  thumbnail: { width: "130px", height: "75px", objectFit: "cover", borderRadius: "8px" },
  suggestedTitle: { fontWeight: "bold", fontSize: "14px", margin: 0 },
  suggestedChannel: { fontSize: "12px", opacity: 0.7 },
};

export default VideoPage;
