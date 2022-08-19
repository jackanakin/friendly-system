FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

WORKDIR /opt/app

COPY src/ src/
COPY @types/ @types/
COPY package.json tsconfig.json .sequelizerc tslint.json .env.production .
RUN mv .env.production .env

RUN npm install
RUN npm run build

USER node

EXPOSE 3333

ENTRYPOINT ["node", "build/index.js"]
