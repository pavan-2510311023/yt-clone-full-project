// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import UploadPage from "./pages/UploadPage";
import ChannelPage from "./pages/ChannelPage";
import CreateChannel from "./pages/CreateChannel";
import EditVideoPage from "./pages/EditVideoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: "200px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/create-channel" element={<CreateChannel />} />
            <Route path="/channel/:id" element={<ChannelPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/edit/:id" element={<EditVideoPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
