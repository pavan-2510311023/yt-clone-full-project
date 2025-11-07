import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateChannel = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a channel name");

    try {
      const res = await fetch("http://localhost:5000/api/channels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, handle, profilePic }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Channel created successfully!");
        navigate(`/channel/${data._id}`); // ✅ Go to that channel page
      } else {
        alert(`❌ ${data.message || "Failed to create channel"}`);
      }
    } catch (err) {
      console.error("Error creating channel:", err);
      alert("Server error");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(6px)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "400px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Create Your Channel</h2>

        <label style={{ display: "block", textAlign: "left" }}>Channel Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setHandle(e.target.value.toLowerCase().replace(/\s+/g, ""));
          }}
          placeholder="Enter channel name"
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0 20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <label style={{ display: "block", textAlign: "left" }}>Handle</label>
        <input
          type="text"
          value={`@${handle}`}
          readOnly
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#f9f9f9",
          }}
        />

        <label style={{ display: "block", textAlign: "left" }}>Profile Picture</label>
        <input type="file" onChange={handleImageUpload} />
        {profilePic && (
          <img
            src={profilePic}
            alt="Preview"
            style={{
              marginTop: "10px",
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}

        <button
          type="submit"
          style={{
            background: "#065fd4",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            marginTop: "20px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Create Channel
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#ccc",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateChannel;
