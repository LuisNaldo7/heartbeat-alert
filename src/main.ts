import * as dotenv from 'dotenv';
import { sendMail } from './mail';
import * as heartbeats from 'heartbeats';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';
import * as Discord from 'discord.js';

dotenv.config();

const MILLI_SECS = 1000;
const heart = heartbeats.createHeart(MILLI_SECS);

createConnection()
  .then(async (connection) => {
    const deviceRepository = connection.getRepository(DeviceEntity);
    const webhook = new Discord.WebhookClient({
      id: process.env.DISCORD_WEBHOOK_CLIENT_ID || 'DISCORD_WEBHOOK_CLIENT_ID',
      token:
        process.env.DISCORD_WEBHOOK_CLIENT_TOKEN ||
        'DISCORD_WEBHOOK_CLIENT_TOKEN',
    });

    heart.createEvent(5, async () => {
      try {
        const tsUnix = new Date(Date.now()).getTime() / 1000;

        const devices = await deviceRepository.find();
        devices.forEach(async (device) => {
          if (device.lastSeen) {
            const datasetTsUnix = new Date(device.lastSeen).getTime();
            const diffSecs = Math.abs(tsUnix - datasetTsUnix);

            const datasetTs = new Date(datasetTsUnix * 1000);

            if (device.maxTimeout && device.maxTimeout < diffSecs) {
              // send mail alert
              if (
                JSON.parse(process.env.MAIL_ENABLED || 'false') &&
                device.alertSentMail == false
              ) {
                const alertText: string =
                  device.description +
                  ' last seen: ' +
                  datasetTs +
                  '\n\ndashboard: ' +
                  process.env.HEARTBEAT_DASHBOARD_URL;
                console.info(alertText);

                const mailSent = await sendMail(alertText);
                if (mailSent) {
                  device.alertSentMail = true;
                  await connection.manager.save(device);
                  console.info('mail alert sent');
                }
              }

              // send discord alert
              if (
                JSON.parse(process.env.DISCORD_ENABLED || 'false') &&
                device.alertSentDiscord == false
              ) {
                const alertText: string =
                  device.description + ' last seen: ' + datasetTs;
                console.info(alertText);

                const discordNotificationSent = await webhook.send(alertText);
                if (discordNotificationSent.id) {
                  device.alertSentDiscord = true;
                  await connection.manager.save(device);
                  console.info('discord alert sent');
                }
              }
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
    });
  })
  .catch((error) => console.log(error));
