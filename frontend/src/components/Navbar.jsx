// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaYoutube, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogoClick = () => navigate("/");

  return (
    <nav style={styles.navbar}>
      {/* Left Section */}
      <div style={styles.left} onClick={handleLogoClick}>
        <FaYoutube size={32} color="red" />
        <h2 style={styles.logoText}>YouTube</h2>
      </div>

      {/* Center Search */}
      <form onSubmit={handleSearch} style={styles.center}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
        <button type="submit" style={styles.searchButton}>🔍</button>
      </form>

      {/* Right Section */}
      <div
        style={styles.right}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {!user ? (
          <Link to="/login" style={styles.signInBtn}>
            Sign In
          </Link>
        ) : (
          <div style={styles.userContainer}>
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                style={styles.avatar}
                title={user.username}
              />
            ) : (
              <FaUserCircle size={28} color="#555" />
            )}
            <span style={styles.username}>{user.username}</span>

            {/* Dropdown */}
            {showDropdown && (
              <div style={styles.dropdown}>
                <Link
                  to={`/channel/${user._id}`}
                  style={styles.dropdownItem}
                  onClick={() => setShowDropdown(false)}
                >
                  My Channel
                </Link>
                <Link
                  to="/upload"
                  style={styles.dropdownItem}
                  onClick={() => setShowDropdown(false)}
                >
                  Upload Video
                </Link>
                <button
                  onClick={handleLogout}
                  style={styles.dropdownItemBtn}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  left: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
  logoText: { fontSize: "20px", fontWeight: "bold", color: "#111" },
  center: { display: "flex", alignItems: "center", gap: "5px", flex: 1, maxWidth: "500px" },
  searchInput: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  },
  searchButton: {
    background: "#f8f8f8",
    border: "1px solid #ccc",
    borderRadius: "20px",
    padding: "8px 12px",
    cursor: "pointer",
  },
  right: { display: "flex", alignItems: "center", gap: "10px", position: "relative" },
  signInBtn: {
    backgroundColor: "#065fd4",
    color: "#fff",
    padding: "8px 15px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "500",
  },
  userContainer: { display: "flex", alignItems: "center", gap: "8px", position: "relative" },
  avatar: { width: "32px", height: "32px", borderRadius: "50%" },
  username: { fontWeight: "500" },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: 0,
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    width: "160px",
    zIndex: 10,
  },
  dropdownItem: { padding: "10px", textDecoration: "none", color: "#333", borderBottom: "1px solid #eee" },
  dropdownItemBtn: {
    padding: "10px",
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    color: "#d93025",
  },
};

export default Navbar;
