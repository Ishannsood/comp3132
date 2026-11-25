const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// In a real app this comes from an environment variable and is never committed.
const JWT_SECRET = process.env.JWT_SECRET || "demo-secret-change-me";
const PORT = process.env.PORT || 4000;

// Hardcoded demo user (no database needed for this exercise).
const DEMO_USER = {
  id: 1,
  username: "demo",
  password: "password123",
  name: "Demo User",
  role: "student",
};

// POST /api/login -> verifies credentials and issues a signed JWT
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
    return res.status(401).json({ message: "Wrong username or password." });
  }
  const payload = { sub: DEMO_USER.id, username: DEMO_USER.username, role: DEMO_USER.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
  res.json({ token, user: { id: DEMO_USER.id, username: DEMO_USER.username, name: DEMO_USER.name } });
});

// Middleware: reads "Authorization: Bearer <token>" and verifies the signature + expiry
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Missing token." });
  }
  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    const message = err.name === "TokenExpiredError" ? "Token expired. Log in again." : "Invalid token.";
    res.status(401).json({ message });
  }
}

// GET /api/profile -> protected: only reachable with a valid JWT
app.get("/api/profile", requireAuth, (req, res) => {
  res.json({
    message: "This data is only visible with a valid token.",
    name: DEMO_USER.name,
    username: req.auth.username,
    role: req.auth.role,
    tokenExpiresAt: new Date(req.auth.exp * 1000).toISOString(),
  });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
