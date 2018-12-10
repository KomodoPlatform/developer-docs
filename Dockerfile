FROM node:alpine

EXPOSE 8080

RUN mkdir -p /opt/app

ADD package.json yarn.lock /tmp/

WORKDIR /opt/app


COPY package.json yarn.lock /app/

RUN cd /tmp && yarn
RUN cd /opt/app && ln -s /tmp/node_modules


