FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY app.js ./

RUN npm install

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000 || exit 1

CMD [ "node", "app.js" ]
