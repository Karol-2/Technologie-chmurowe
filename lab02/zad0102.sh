#!/bin/bash
cat <<EOF > Dockerfile
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npm start
EOF


cat <<EOF > package.json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "express": "^4.17.1"
  },
  "scripts": {
    "start": "node index.js"
  }
}
EOF


cat <<EOF > index.js
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  const data = new Date().toISOString();
  res.json({ data });
});

app.listen(port, () => {
  console.log(\`App is running on port: \${port}\`);
});
EOF


docker build -t node-express-app .
docker run -p 8080:8080 node-express-app