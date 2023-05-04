const express = require("express");
const Redis = require("ioredis");
const { Client } = require("pg");

const app = express();
app.use(express.json());

const clientRedis = new Redis({
  host: "redis",
  port: 6379,
});
clientRedis.on("error", (err) => console.log(err));
clientRedis.on('connect', () => {
    console.log('Połączono z Redis');
  });

const clientPostgress = new Client({
    host: "db",
    port: 5432,
    database: "mydb",
    user: "myuser",
    password: "mypassword",
  });
clientPostgress.connect();

clientPostgress.connect((err) => {
  if (err) {
    console.error("Błąd połączenia z bazą danych Postgres", err.stack);
  } else {
    console.log("Połączono z bazą danych Postgres");
  }
});

clientPostgress.query(
    "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(50) NOT NULL);"
  );

app.get("/", (req, res) => {
  res.send("Idź na /messages lub /users");
});

app.post("/messages", async (req, res) => {
  const message = req.body.message;
  await clientRedis
  .rpush("messages", message);
  res.send("Udało się wysłać wiadomośc!");
});

app.get("/messages", async (req, res) => {
  const messages = await clientRedis
  .lrange("messages", 0, -1);
  res.send(messages);
});

app.get("/users", async (req, res) => {
  const users = await clientPostgress.query("SELECT * FROM users");
  res.send(users.rows);
});

app.post("/users", async (req, res) => {
  const user = req.body.user;
  await clientPostgress.query("INSERT INTO users (username) VALUES ($1)", [user]);
  res.send("User added");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});