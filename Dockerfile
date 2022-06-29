FROM node:16.15-alpine
WORKDIR /app
ADD . /app
RUN corepack enable
RUN yarn install
RUN yarn build
CMD [ "yarn", "start" ]