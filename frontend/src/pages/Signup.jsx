import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    alert("Signup successful (mock)");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Signup Page</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
