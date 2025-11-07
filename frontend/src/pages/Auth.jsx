import React, { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(endpoint, form);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        alert("Registration successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h2>{isLogin ? "Sign In" : "Register"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {!isLogin && (
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? "Sign In" : "Register"}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ color: "blue", cursor: "pointer", marginTop: 10 }}>
        {isLogin ? "New user? Register here" : "Already have an account? Sign in"}
      </p>
    </div>
  );
}
