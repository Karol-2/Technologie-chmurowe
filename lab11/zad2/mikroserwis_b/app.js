const express = require('express');
const Redis = require("ioredis");

const app = express();
const port = 3000;
app.use(express.json());

const client = new Redis({
  host: "redis-service",
  port: 6379,
});
client.on("error", (err) => console.log(err));

client.on('connect', () => {
    console.log('Połączono z Redis');
  });

app.get('/endpoint',async (req, res) => {

  const messages = await client.lrange("messages", 0, -1);
  res.send(messages);
});

app.post("/messages", async (req, res) => {
  const message = req.body.message;
  await client.rpush("messages", message);
  res.send("Udało się wysłać wiadomośc!");
});

app.listen(port, () => {
  console.log(`Mikroserwis_b nasłuchuje na porcie ${port}`);
});