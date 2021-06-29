# Heartbeat-Alert

Heartbeat-Alert triggers an alert mail when a [Heartbeat-Client](https://github.com/LuisNaldo7/heartbeat-client) does not report any activity in a timely manner. To increase the system's overall reliability it directly connects to the database and works independently from the [Heartbeat-Server](https://github.com/LuisNaldo7/heartbeat-server).

## Components

[Heartbeat-Client](https://github.com/LuisNaldo7/heartbeat-client)

[Heartbeat-Server](https://github.com/LuisNaldo7/heartbeat-server)

[Heartbeat-Alert](https://github.com/LuisNaldo7/heartbeat-alert)

[Heartbeat-Dashboard](https://github.com/LuisNaldo7/heartbeat-dashboard)

![Diagram](https://github.com/LuisNaldo7/heartbeat-local-dev-env/blob/main/docs/components.png?raw=true)

---
A full integration can be set up using the [Local Development Environment](https://github.com/LuisNaldo7/heartbeat-local-dev-env).
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
