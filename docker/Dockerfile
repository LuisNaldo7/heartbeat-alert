# Build stage
FROM node:16.13.1 AS build

## Create app directory
WORKDIR /app

## Install app dependencies
COPY tsconfig*.json package*.json ./
RUN npm ci --only=production
RUN npm i -g typescript@4.5.5

## Bundle app source
COPY ./src ./src

## Build app
RUN npm run build



# Run stage
FROM node:16.13.1

## Switch to less privileged user
USER node

## Declare env vars
ENV TYPEORM_CONNECTION=mysql
ENV TYPEORM_HOST=localhost
ENV TYPEORM_PORT=3306
ENV TYPEORM_USERNAME=heartbeat
ENV TYPEORM_PASSWORD=password
ENV TYPEORM_DATABASE=heartbeat
ENV TYPEORM_SYNCHRONIZE=false
ENV TYPEORM_LOGGING=false
ENV TYPEORM_ENTITIES=dist/**/*.entity.js
ENV TYPEORM_DRIVER_EXTRA='{ "ssl": { "rejectUnauthorized": false } }'

ENV MAIL_ENABLED=false
ENV MAIL_HOST='smtp.gmail.com'
ENV MAIL_PORT=587
ENV MAIL_FROM='mail@example.com'
ENV MAIL_PASSWORD=''
ENV MAIL_TLS=true
ENV MAIL_TO='mail@example.com'
ENV MAIL_SUBJECT='Heartbeat Alert!!!'

ENV DISCORD_ENABLED=false
ENV DISCORD_WEBHOOK_CLIENT_ID=123456789012345678
ENV DISCORD_WEBHOOK_CLIENT_TOKEN=vg5k_jAR...BKg

ENV HEARTBEAT_DASHBOARD_URL=''

## Create app directory
WORKDIR /app

## Copy app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

## Execute app
CMD [ "node", "dist/main"]
