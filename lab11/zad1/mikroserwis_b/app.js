const express = require('express');

const app = express();
const port = 3000;

app.get('/endpoint', (req, res) => {
  res.send('To jest odpowiedź z mikroserwisu_b');
});

app.listen(port, () => {
  console.log(`Mikroserwis_b nasłuchuje na porcie ${port}`);
});