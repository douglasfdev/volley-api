FROM node:lts-alpine

RUN apk add --no-cache bash

WORKDIR /home/node/app

COPY ./package.json /home/node/app/

EXPOSE 5000

RUN npm i -g @nestjs/cli

RUN npm i

COPY . .

CMD [ "npm", "run", "start:dev" ]
