#!/bin/bash
docker run -d -p 27017:27017 --name mongodb mongo
docker build -t zad3 .

docker run -d -p 8080:8080 --link mongodb:mongodb zad3