import * as dotenv from 'dotenv';
import * as mysql from 'mysql';
import { sendMail } from './mail';
import { getConnection, getDatasets } from './sql';
const heartbeats = require('heartbeats');

dotenv.config();

const MILLI_SECS: number = 1000;
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

    let tsUnix = new Date(Date.now()).getTime() / 1000;
    await getDatasets(con).then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].last_seen) {
          let datasetTsUnix = new Date(res[i].last_seen).getTime();
          let diffSecs = Math.abs(tsUnix - datasetTsUnix);
          if (res[i].max_timeout < diffSecs) {
            let datasetTs = new Date(datasetTsUnix * 1000);
            let alertText: string =
              res[i].description + ' last seen: ' + datasetTs;
            console.log(alertText);
            sendMail(alertText);
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});
