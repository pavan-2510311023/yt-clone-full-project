import React, { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const LikeDislikeButtons = ({ videoId }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch latest like/dislike counts for this video
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${videoId}`);
        const data = await res.json();
        setLikes(data.likes?.length || 0);
        setDislikes(data.dislikes?.length || 0);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setUserLiked(data.likes?.includes(user._id));
          setUserDisliked(data.dislikes?.includes(user._id));
        }
      } catch (err) {
        console.error("Error fetching video data:", err);
      }
    };
    fetchVideoData();
  }, [videoId]);

  const handleLike = async () => {
    if (!token) return alert("Please sign in to like videos!");
    try {
      const res = await fetch(`http://localhost:5000/api/interact/like/${videoId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setLikes(data.likes);
      setUserLiked(!userLiked);
      setUserDisliked(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    if (!token) return alert("Please sign in to dislike videos!");
    try {
      const res = await fetch(`http://localhost:5000/api/interact/dislike/${videoId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setDislikes(data.dislikes);
      setUserDisliked(!userDisliked);
      setUserLiked(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
      <button
        onClick={handleLike}
        style={{
          background: "none",
          border: "none",
          color: userLiked ? "#0f9d58" : "#333",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
        }}
      >
        <FaThumbsUp style={{ marginRight: "6px" }} /> {likes}
      </button>

      <button
        onClick={handleDislike}
        style={{
          background: "none",
          border: "none",
          color: userDisliked ? "#d93025" : "#333",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
        }}
      >
        <FaThumbsDown style={{ marginRight: "6px" }} /> {dislikes}
      </button>
    </div>
  );
};

export default LikeDislikeButtons;
