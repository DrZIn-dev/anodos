FROM node:16.14 AS development
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .
ENTRYPOINT ["yarn", "run", "start:dev"]

FROM node:16.14.2-alpine3.15 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .
RUN ["yarn", "run", "build"]

FROM node:16.14.2-alpine3.15 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install --production && \
    yarn cache clean
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/main"]
EXPOSE 80