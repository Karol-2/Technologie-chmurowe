echo 'const http = require("http");
http.createServer((req,res)=>{
        res.write("\nHello World\n");
        res.end();
        }
).listen(8080);'> "$PWD/server.js"


docker run -p 8080:8080 -itd --name zadanie1 node:12 

docker cp server.js zadanie1:/server.js

docker exec -d zadanie1 node /server.js

