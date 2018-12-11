FROM node:alpine

EXPOSE 8080

RUN mkdir -p /opt/app/tmp

COPY package.json yarn.lock /opt/app/tmp/

RUN cd /opt/app/tmp && yarn
RUN cd /opt/app && ln -s /opt/app/tmp/node_modules

WORKDIR /opt/app/
