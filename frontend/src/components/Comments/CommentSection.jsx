import React, { useState, useEffect } from "react";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // ✅ Load comments (you’ll connect this to your backend API later)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/comments/${videoId}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
  }, [videoId]);

  // ✅ Handle adding a comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      text: newComment,
      videoId,
      likes: 0,
      replies: [],
    };

    // Mock frontend addition until backend is wired
    setComments([commentData, ...comments]);
    setNewComment("");

    try {
      await fetch(`http://localhost:5000/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  // ✅ Like comment handler
  const handleLike = (index) => {
    const updated = [...comments];
    updated[index].likes += 1;
    setComments(updated);
  };

  // ✅ Reply handler
  const handleReply = (index, replyText) => {
    if (!replyText.trim()) return;
    const updated = [...comments];
    updated[index].replies.push({ text: replyText });
    setComments(updated);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Comments</h3>

      <form onSubmit={handleAddComment} style={{ marginBottom: "20px" }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a public comment..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#065fd4",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Comment
        </button>
      </form>

      {/* Comment List */}
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c, i) => (
          <div
            key={i}
            style={{
              marginBottom: "20px",
              padding: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <p>{c.text}</p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                onClick={() => handleLike(i)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#065fd4",
                  cursor: "pointer",
                }}
              >
                👍 {c.likes}
              </button>
              <ReplyBox index={i} onReply={handleReply} />
            </div>

            {/* Replies */}
            {c.replies?.length > 0 && (
              <div style={{ marginLeft: "20px", marginTop: "10px" }}>
                {c.replies.map((r, ri) => (
                  <p key={ri} style={{ opacity: 0.8 }}>
                    ↳ {r.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

// ✅ Separate ReplyBox Component
const ReplyBox = ({ index, onReply }) => {
  const [reply, setReply] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onReply(index, reply);
    setReply("");
    setShowInput(false);
  };

  return (
    <div>
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          style={{
            background: "none",
            border: "none",
            color: "#065fd4",
            cursor: "pointer",
          }}
        >
          Reply
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: "5px" }}>
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            style={{
              padding: "5px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: "5px",
              backgroundColor: "#065fd4",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
            }}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
