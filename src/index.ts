import * as dotenv from 'dotenv';
import * as mysql from 'mysql';
import { sendMail } from './mail';
import { getConnection, getDatasets } from './sql';
const heartbeats = require('heartbeats');

dotenv.config();

const milliSec: number = 1000;
const heart = heartbeats.createHeart(milliSec);

let con: mysql.Connection;

heart.createEvent(3, () => {
  try {
    if (
      con == null ||
      con.state == 'disconnected' ||
      con.state == 'protocol_error'
    ) {
      con = getConnection();
    }

    let datasets = getDatasets(con);

    if (true) {
      sendMail();
    }
  } catch (err) {
    console.log(err);
  }
});
