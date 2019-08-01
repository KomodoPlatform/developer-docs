FROM node:alpine

EXPOSE 8080

RUN mkdir -p /app/

WORKDIR /app/

ENTRYPOINT ./algolia-key.sh && yarn install && yarn docs:build
