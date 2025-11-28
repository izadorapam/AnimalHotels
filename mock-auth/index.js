const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, "..", "db.json");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";
const TOKEN_EXPIRES_IN = "2h";

function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}


app.post("/login", (req, res) => {
  const { email, senha, password: pwd } = req.body;
  const passwd = senha ?? pwd;
  if (!email || !passwd) {
    return res.status(400).json({ message: "email e senha são obrigatórios" });
  }

  const db = readDB();
  const user = db.users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase() && u.password === passwd
  );

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });

  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser, token });
});


app.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Token ausente" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const db = readDB();
    const user = db.users.find((u) => u.id === payload.userId);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    const { password, ...safeUser } = user;
    return res.json({ user: safeUser });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Mock auth server running on http://localhost:${PORT}`));