const express = require("express");
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const app = express();
const jwt = require("jsonwebtoken");
const SECRET = "anasilvatool";
const usuarios = require("./src/data/usuarios.json");

const port = 8000;

app.use(session({ secret: SECRET }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json("asssss");
});

function verifyJWT(req, res, next) {
  const token = req.headers.token;
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).end();
    next();
  });
}

app.get("/usuarios", verifyJWT, (req, res) => {
  return res.json(usuarios);
});

app.post("/login", (req, res) => {
  if (req.body.email === "1234@gmail.com" && req.body.password === "12345678") {
    const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 });
    return res.json({ auth: true, token });
  }
  res.status(401).end();
});

app.listen(port, () => {
  console.log("Servidor esta funcionando");
});
