import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api/users", async (req, res) => {
  const [rows] = await db.execute("SELECT * FROM users");
  res.json(rows);
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  const [result] = await db.execute(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );

  const [rows] = await db.execute(
    "SELECT * FROM users WHERE id = ?",
    [result.insertId]
  );

  res.status(201).json(rows[0]);
});

app.delete("/api/users/:id", async (req, res) => {
  await db.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
  res.status(204).send();
})

app.put("/api/users/:id", async (req, res) => {
  const { name, email } = req.body;

  await db.execute(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, req.params.id]
  );
  const [rows] = await db.execute(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id]
  );

  res.json(rows[0]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})
