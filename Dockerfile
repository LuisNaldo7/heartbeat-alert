FROM node:lts

ENV HEARTBEAT_DB_HOST='localhost'
ENV HEARTBEAT_DB_PORT=3307
ENV HEARTBEAT_DB_SSL=true
ENV HEARTBEAT_DB_USER='heartbeat'
ENV HEARTBEAT_DB_PASSWORD=''
ENV HEARTBEAT_DB_DATABASE='heartbeat'
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
