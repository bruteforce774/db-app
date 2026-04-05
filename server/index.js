import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/users", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM users");
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  const result = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(name, email);
  const user = db.prepare("SELECT * FROM users where id = ?").get(result.lastInsertRowid);

  res.status(201).json(user);
});

app.delete("/api/users/:id", (req, res) => {
  db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
  res.status(204).send();
})

app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  db.prepare("UPDATE users SET name = ?, email = ? WHERE id = ?").run(name, email, req.params.id);
  const user = db.prepare("SELECT * FROM users where id = ?").get(req.params.id);
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
