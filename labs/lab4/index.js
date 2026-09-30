const express = require("express");
const app = express();

// Parse JSON request bodies (needed for POST /users)
app.use(express.json());

// Serve static files from /public
// instruction.html will be reachable at http://localhost:3000/instruction.html
app.use(express.static("public"));

// GET /hello -> plain text
app.get("/hello", (req, res) => {
  res.type("text/plain").send("Hello Express JS");
});

// GET /user?firstname=&lastname=  (query parameters, with defaults)
app.get("/user", (req, res) => {
  const firstname = req.query.firstname || "Pritesh";
  const lastname = req.query.lastname || "Patel";
  res.json({ firstname, lastname });
});

// POST /user/:firstname/:lastname  (path parameters)
app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

// POST /users  (body: array of { firstname, lastname })
app.post("/users", (req, res) => {
  const users = Array.isArray(req.body) ? req.body : [];
  res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
