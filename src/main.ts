import * as dotenv from 'dotenv';
import * as mysql from 'mysql';
import { sendMail } from './mail';
import { getConnection, getDevices, updateMailSent } from './sql';
import * as heartbeats from 'heartbeats';

dotenv.config();

const MILLI_SECS = 1000;
const heart = heartbeats.createHeart(MILLI_SECS);

let con: mysql.Connection;

heart.createEvent(5, async () => {
  try {
    if (
      con == null ||
      con.state == 'disconnected' ||
      con.state == 'protocol_error'
    ) {
      con = getConnection();
    }

    const tsUnix = new Date(Date.now()).getTime() / 1000;
    await getDevices(con).then(async (res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].last_seen) {
          const datasetTsUnix = new Date(res[i].last_seen).getTime();
          const diffSecs = Math.abs(tsUnix - datasetTsUnix);

          if (res[i].mail_sent == false && res[i].max_timeout < diffSecs) {
            const datasetTs = new Date(datasetTsUnix * 1000);
            const alertText: string =
              res[i].description + ' last seen: ' + datasetTs;
            console.info(alertText);

            const mailSent = await sendMail(alertText);
            if (mailSent) {
              updateMailSent(con, res[i].guid, mailSent);
            }
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});
