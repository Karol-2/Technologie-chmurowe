#!/bin/bash
IMAGE_NAME="example-app"
GIT_REPO="https://github.com/Karol-2/empty-react-app.git"

cat <<EOF > Dockerfile-dev
FROM alpine:latest
RUN apk --no-cache add curl git npm
ARG GIT_REPO
RUN git clone ${GIT_REPO} /app
WORKDIR /app/my-app
RUN npm install
EXPOSE 3000

EOF

docker build --build-arg GIT_REPO=${GIT_REPO} -t ${IMAGE_NAME}-dev -f Dockerfile-dev .

cat <<EOF > Dockerfile-app
FROM nginx:latest
COPY --from=${IMAGE_NAME}-dev /app/my-app /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
EOF

docker build -t ${IMAGE_NAME} -f Dockerfile-app .

docker network create app_network

docker run -d --network app_network -p 3000:3000 ${IMAGE_NAME}