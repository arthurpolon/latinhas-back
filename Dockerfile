FROM node:lts-alpine AS base
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm i
COPY --chown=node:node . .

FROM dependencies AS build
ENV NODE_ENV build
RUN npm run build

FROM base AS production
ENV NODE_ENV production
ENV PORT $PORT
ENV HOST 0.0.0.0
COPY --chown=node:node ./package*.json ./
RUN npm i --omit=dev
COPY --from=build --chown=node:node /home/node/app/dist .
EXPOSE $PORT
CMD ["node", "main.js"]