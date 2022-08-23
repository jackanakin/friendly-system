FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash

WORKDIR /opt/app

COPY src/ src/
COPY @types/ @types/
COPY package.json tsconfig.json .sequelizerc tslint.json .

RUN npm install
RUN npm run build

RUN rm -rf @types/ src/

COPY .docker/entrypoint.sh .
RUN ["chmod", "+x", "/opt/app/entrypoint.sh"]

USER node

ENTRYPOINT ["/opt/app/entrypoint.sh"]
