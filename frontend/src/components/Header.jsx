import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaMicrophone, FaBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: darkMode ? "#202020" : "#fff",
        borderBottom: darkMode ? "1px solid #333" : "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        transition: "background 0.4s ease, border 0.4s ease",
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FaYoutube color="red" size={28} />
        <Link
          to="/"
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: darkMode ? "#fff" : "#000",
            textDecoration: "none",
          }}
        >
          YouTube
        </Link>
      </div>

      {/* Center: Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flex: 1,
          maxWidth: "600px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "20px",
            outline: "none",
            background: darkMode ? "#121212" : "#f9f9f9",
            color: darkMode ? "#fff" : "#000",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        />
        <FaMicrophone size={18} color={darkMode ? "#fff" : "#555"} />
      </div>

      {/* Right: Theme toggle + user */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Theme Toggle */}
        <div
          onClick={toggleTheme}
          style={{
            cursor: "pointer",
            width: "50px",
            height: "25px",
            borderRadius: "20px",
            background: darkMode ? "#444" : "#ddd",
            position: "relative",
            transition: "background 0.4s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: darkMode ? "flex-end" : "flex-start",
            padding: "3px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: darkMode ? "#f1c40f" : "#222",
              transition: "all 0.4s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: darkMode ? "#000" : "#fff",
            }}
          >
            {darkMode ? <FaMoon size={10} /> : <FaSun size={10} />}
          </div>
        </div>

        <FaBell size={18} color={darkMode ? "#fff" : "#555"} />
        <Link to="/auth">
          <FaUserCircle size={24} color={darkMode ? "#fff" : "#555"} />
        </Link>
      </div>
    </header>
  );
}
