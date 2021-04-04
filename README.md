# Heartbeat-Alert

## Run

    npm start

## Run in Docker

build image
    
    docker build -t luisnaldo7/heartbeat-alert:latest .

execute image

    docker run -d -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" -e HEARTBEAT_MAIL_FROM="mail@example.com" -e HEARTBEAT_MAIL_PASSWORD="pass" -e HEARTBEAT_MAIL_TO="mail@example.com" --rm --name heartbeat-alert luisnaldo7/heartbeat-alert:latest

run container on boot

    docker run -d -e HEARTBEAT_DB_HOST="localhost" -e HEARTBEAT_DB_PASSWORD="pass" -e HEARTBEAT_MAIL_FROM="mail@example.com" -e HEARTBEAT_MAIL_PASSWORD="pass" -e HEARTBEAT_MAIL_TO="mail@example.com" --restart always --name heartbeat-alert luisnaldo7/heartbeat-alert:latest