# Heartbeat-Alert

## Run

Copy .env.example to .env and adjust values.

install dependencies
```bash
npm i
```

start app
```bash
npm start
```
## Run in Docker

pull image
```bash
docker pull luisnaldo7/heartbeat-alert:latest
```

or build image
```bash 
docker build -t luisnaldo7/heartbeat-alert:latest .
```

execute container
```bash 
docker run -d -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" -e HEARTBEAT_MAIL_FROM="mail@example.com" -e HEARTBEAT_MAIL_PASSWORD="pass" -e HEARTBEAT_MAIL_TO="mail@example.com" --rm --name heartbeat-alert luisnaldo7/heartbeat-alert:latest
```

execute container on boot
```bash 
docker run -d -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" -e HEARTBEAT_MAIL_FROM="mail@example.com" -e HEARTBEAT_MAIL_PASSWORD="pass" -e HEARTBEAT_MAIL_TO="mail@example.com" --restart always --name heartbeat-alert luisnaldo7/heartbeat-alert:latest
```
