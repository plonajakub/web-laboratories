FROM node:12-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./package*.json ./

USER node

RUN npm install

COPY --chown=node:node ./ ./

RUN node src/index.js

RUN node src/axiosTest.js

EXPOSE 8088

CMD [ "node", "src/server.js" ]