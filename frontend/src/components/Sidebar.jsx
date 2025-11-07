// src/components/Sidebar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaPlay,
  FaHistory,
  FaRegThumbsUp,
  FaMusic,
  FaFilm,
  FaGamepad,
  FaFire,
  FaShoppingBag,
  FaRegClock,
  FaListUl,
  FaRss,
  FaTrophy,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { darkMode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  // Collapse sidebar automatically on small screens
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 800);
    };
    handleResize(); // run once on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    {
      title: "",
      links: [
        { to: "/", label: "Home", icon: <FaHome /> },
        { to: "/shorts", label: "Shorts", icon: <FaPlay /> },
        { to: "/subscriptions", label: "Subscriptions", icon: <FaListUl /> },
      ],
    },
    {
      title: "You",
      links: [
        { to: "/history", label: "History", icon: <FaHistory /> },
        { to: "/playlists", label: "Playlists", icon: <FaListUl /> },
        { to: "/watchlater", label: "Watch later", icon: <FaRegClock /> },
        { to: "/liked", label: "Liked videos", icon: <FaRegThumbsUp /> },
      ],
    },
    {
      title: "Explore",
      links: [
        { to: "/trending", label: "Trending", icon: <FaFire /> },
        { to: "/shopping", label: "Shopping", icon: <FaShoppingBag /> },
        { to: "/music", label: "Music", icon: <FaMusic /> },
        { to: "/movies", label: "Movies", icon: <FaFilm /> },
        { to: "/live", label: "Live", icon: <FaRss /> },
        { to: "/gaming", label: "Gaming", icon: <FaGamepad /> },
        { to: "/news", label: "News", icon: <FaRss /> },
        { to: "/sports", label: "Sports", icon: <FaTrophy /> },
      ],
    },
  ];

  return (
    <aside className={`sidebar ${darkMode ? "dark" : ""} ${collapsed ? "collapsed" : ""}`}>
      {sections.map((section, index) => (
        <div key={index} className="sidebar-section">
          {!collapsed && section.title && (
            <h4 className="sidebar-title">{section.title}</h4>
          )}
          {section.links.map((link, i) => (
            <Link
              key={i}
              to={link.to}
              className="sidebar-link"
              title={collapsed ? link.label : ""}
            >
              <span className="sidebar-icon">{link.icon}</span>
              {!collapsed && <span className="sidebar-label">{link.label}</span>}
            </Link>
          ))}
          {!collapsed && <hr className="sidebar-divider" />}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
