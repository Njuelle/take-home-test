FROM node:lts-alpine

WORKDIR /usr/src

COPY . /usr/src/

RUN yarn install
RUN yarn build


CMD ["yarn", "start"]