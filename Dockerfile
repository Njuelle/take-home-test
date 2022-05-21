FROM node:lts-alpine

WORKDIR /usr/src

COPY . /usr/src/
# COPY package.json /usr/src/package.json
RUN yarn install
RUN yarn build


CMD ["yarn", "start"]