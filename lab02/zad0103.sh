#!/bin/bash

# Zainstaluj Dockera i pobierz obraz z MongoDB
docker pull mongo

# Utwórz sieć Dockera, aby kontenery mogły się ze sobą komunikować
docker network create mynetwork

# Uruchom kontener MongoDB i przypisz mu adres IP
mongo_container=$(sudo docker run --name mongo_container --network mynetwork -d mongo)
mongo_ip=$(sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $mongo_container)

# Utwórz plik Dockerfile z konfiguracją aplikacji
cat <<EOF > Dockerfile
FROM node:16
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV MONGO_IP $mongo_ip
EXPOSE 8080
CMD ["npm", "start"]
EOF

# Zbuduj obraz aplikacji
docker build -t myapp .

# Uruchom kontener z aplikacją
docker run --name app_container --network mynetwork -p 8080:8080 -d myapp