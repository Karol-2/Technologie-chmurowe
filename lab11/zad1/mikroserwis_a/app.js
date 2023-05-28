const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://mikroserwis-b-service/endpoint');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Wystąpił błąd');
  }
});

app.listen(port, () => {
  console.log(`Mikroserwis_a nasłuchuje na porcie ${port}`);
});
