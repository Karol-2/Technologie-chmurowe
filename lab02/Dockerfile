FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV MONGO_IP 
EXPOSE 8080
CMD ["npm", "start"]
