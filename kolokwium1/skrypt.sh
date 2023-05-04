docker build -t myapp .
docker network create siec
docker run -itd -p 8080:8080 --network siec myapp