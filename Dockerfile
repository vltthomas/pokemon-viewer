FROM node:16-alpine

WORKDIR /home/node/app

COPY ~/.next/* /home/node/app/

EXPOSE 80
