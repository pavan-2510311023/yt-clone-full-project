import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// 🟢 Register New User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    // 1️⃣ Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if email or username already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    // 5️⃣ Return success message
    res.status(201).json({
      message: "Registration successful! Please login to continue.",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// 🟢 Login Existing User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check for user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No account found with this email" });

    // 2️⃣ Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Incorrect password" });

    // 3️⃣ Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Return token and user details
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};
