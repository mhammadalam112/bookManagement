FROM node:20.11-alpine
WORKDIR /bookApp
RUN apk update && apk add curl
COPY package*.json /bookApp
RUN npm install
COPY . /bookApp
RUN npm run build
EXPOSE 3000
CMD npm run typeorm migration:run && node dist/src/main.js


