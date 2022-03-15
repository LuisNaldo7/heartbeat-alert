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

```
npm i
```

start app

```
npm start
```

## Run in Docker

pull image

```
docker pull luisnaldo7/heartbeat-alert:latest
```

or build image

```
docker build -t luisnaldo7/heartbeat-alert:latest -f docker/Dockerfile .
```

execute container

```
docker run -d -e TYPEORM_HOST="localhost" -e TYPEORM_PASSWORD="pass" -e DISCORD_ENABLED="true" -e DISCORD_WEBHOOK_CLIENT_ID="123456789012345678" -e DISCORD_WEBHOOK_CLIENT_TOKEN="vg5k_jAR...BKg" --rm --name heartbeat-alert luisnaldo7/heartbeat-alert:latest
```

execute container on boot

```
docker run -d -e TYPEORM_HOST="localhost" -e TYPEORM_PASSWORD="pass" -e DISCORD_ENABLED="true" -e DISCORD_WEBHOOK_CLIENT_ID="123456789012345678" -e DISCORD_WEBHOOK_CLIENT_TOKEN="vg5k_jAR...BKg" --restart always --name heartbeat-alert luisnaldo7/heartbeat-alert:latest
```
