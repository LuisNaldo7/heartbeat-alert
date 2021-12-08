FROM node:16.13.1

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

# Create app directory
WORKDIR /app

# Install app dependencies
COPY tsconfig*.json package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY ./src ./src

# Build app
RUN npm run build

CMD [ "node", "dist/main"]
