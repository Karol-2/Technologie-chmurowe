#!/bin/bash

cat > Dockerfile <<EOF
FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
EOF

docker build -t zad0302 .

docker run -d --name app -p 2137:2137 zad0302
