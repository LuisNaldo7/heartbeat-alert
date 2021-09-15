import * as dotenv from 'dotenv';
import { sendMail } from './mail';
import * as heartbeats from 'heartbeats';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { DeviceEntity } from './entities/device.entity';

dotenv.config();

const MILLI_SECS = 1000;
const heart = heartbeats.createHeart(MILLI_SECS);

createConnection()
  .then(async (connection) => {
    const deviceRepository = connection.getRepository(DeviceEntity);

    heart.createEvent(5, async () => {
      try {
        const tsUnix = new Date(Date.now()).getTime() / 1000;

        const devices = await deviceRepository.find();
        devices.forEach(async (device) => {
          if (device.lastSeen) {
            const datasetTsUnix = new Date(device.lastSeen).getTime();
            const diffSecs = Math.abs(tsUnix - datasetTsUnix);

            if (
              device.mailSent == false &&
              device.maxTimeout &&
              device.maxTimeout < diffSecs
            ) {
              const datasetTs = new Date(datasetTsUnix * 1000);
              const alertText: string =
                device.description + ' last seen: ' + datasetTs + 
                '\n\ndashboard: ' + process.env.HEARTBEAT_DASHBOARD_URL
              console.info(alertText);

              const mailSent = await sendMail(alertText);
              if (mailSent) {
                device.mailSent = true;
                await connection.manager.save(device);
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
