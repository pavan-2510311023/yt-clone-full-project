import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// 🔒 Middleware to verify JWT
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach user info (id, username)

    next(); // continue to the protected route
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
