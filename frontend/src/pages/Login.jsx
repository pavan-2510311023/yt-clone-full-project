// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      // ✅ Save user and token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Login successful!");
      navigate("/");
      window.location.reload(); // ensures Navbar updates
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "1rem" }}>Login to Your Account</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Don’t have an account?{" "}
        <span
          style={styles.link}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "4rem auto",
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
  link: {
    color: "#065fd4",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;
