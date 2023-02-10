FROM node:16-bullseye-slim as dev
WORKDIR /app
ADD . /app
RUN corepack enable
RUN yarn install