FROM node:alpine

EXPOSE 8080

RUN mkdir -p /app/

WORKDIR /app/

RUN ./algolia-key.sh

ENTRYPOINT yarn install && yarn docs:build
