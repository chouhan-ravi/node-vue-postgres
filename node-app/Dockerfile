FROM node:lts-alpine

WORKDIR /home/app

COPY package.json /home/app/

COPY . /home/app

RUN npm install

CMD npm start --production