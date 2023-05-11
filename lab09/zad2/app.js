const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.status(200).send('Witaj w mojej aplikacji REST!');
});

app.post('/', (req, res) => {
  res.status(201).send('Otrzymałem żądanie POST!');
});

app.put('/', (req, res) => {
  res.status(200).send('Otrzymałem żądanie PUT!');
});

app.delete('/', (req, res) => {
  res.status(200).send('Otrzymałem żądanie DELETE!');
});

app.use((req, res, next) => {
  res.status(404).send('Nie znaleziono żądanej strony!');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Wystąpił błąd serwera!');
});


app.listen(3000, () => {
  console.log('Serwer został uruchomiony na porcie 3000');
});
