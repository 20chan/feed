#!/bin/bash

if [ "$1" = "--deploy" ]; then
    CLIENT_DOCKERFILE=Dockerfile docker-compose up --build --force-recreate
elif [ "$1" = "--develop" ]; then
    CLIENT_DOCKERFILE=Dockerfile-dev docker-compose up --build --force-recreate
fi
