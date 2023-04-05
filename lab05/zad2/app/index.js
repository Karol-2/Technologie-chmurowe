const port = process.env.PORT;

const express = require('express');

const app = express();

app.get('/', (_, res) => {
  res.send('Hello Stepik zadanie 2!');
});

app.listen(3000, () => {
  console.log(`Server running on port ${port}`);
});
