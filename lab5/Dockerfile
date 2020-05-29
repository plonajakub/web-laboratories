# Build
FROM node:latest as build

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY ./app/package.json /usr/src/app/package.json

RUN npm install --silent
RUN npm install react-scripts -g --silent
COPY ./app /usr/src/app
RUN npm run build

# Setup server
FROM nginx:latest

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
