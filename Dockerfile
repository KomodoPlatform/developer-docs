FROM node:alpine

EXPOSE 8080

RUN mkdir /app

WORKDIR /app

RUN yarn add -D vuepress
RUN yarn install 

