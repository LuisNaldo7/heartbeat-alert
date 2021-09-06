FROM node:lts

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

ENV HEARTBEAT_MAIL_HOST='smtp.gmail.com'
ENV HEARTBEAT_MAIL_PORT=587
ENV HEARTBEAT_MAIL_FROM='mail@example.com'
ENV HEARTBEAT_MAIL_PASSWORD=''
ENV HEARTBEAT_MAIL_TLS=true
ENV HEARTBEAT_MAIL_TO='mail@example.com'
ENV HEARTBEAT_MAIL_SUBJECT='Heartbeat Alert!!!'

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci --only=production

# Bundle app source
COPY ./src ./src

# Build app
RUN npm run build

CMD [ "node", "dist/main"]
