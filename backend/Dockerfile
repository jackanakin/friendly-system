FROM node:current-alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn install --production
COPY .env ./
COPY dist ./dist

EXPOSE 3333
CMD ["yarn", "start"]