import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CategoryBar from "./CategoryBar";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <CategoryBar />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#f9f9f9",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
