import React from "react";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Education",
  "Movies",
  "Technology",
  "Sports",
  "News",
];

const CategoryBar = ({ selectedCategory, onSelect }) => {
  return (
    <div style={styles.container}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            ...styles.button,
            backgroundColor: selectedCategory === cat ? "#000" : "#f2f2f2",
            color: selectedCategory === cat ? "#fff" : "#000",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    overflowX: "auto",
    gap: "10px",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
    position: "sticky",
    top: "60px",
    zIndex: 999,
  },
  button: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
};

export default CategoryBar;
