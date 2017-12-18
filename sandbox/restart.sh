#!/bin/bash
docker stop `docker ps -a | grep crypto | awk '{print $1}'`; docker rm `docker ps -a | grep crypto | awk '{print $1}'`
docker build -t cryptoflipto/sandbox:v0.0.1 .
docker run -d -p 8082:8080 cryptoflipto/sandbox:v0.0.1
