import * as mysql from 'mysql';
import { fallback } from './fallback-values';

export function getConnection(): mysql.Connection {
  const con = mysql.createConnection({
    host: process.env.HEARTBEAT_DB_HOST || fallback.HEARTBEAT_DB_HOST,
    port: Number(process.env.HEARTBEAT_DB_PORT) || fallback.HEARTBEAT_DB_PORT,
    ssl: JSON.parse(process.env.HEARTBEAT_DB_SSL || fallback.HEARTBEAT_DB_SSL),
    user: process.env.HEARTBEAT_DB_USER || fallback.HEARTBEAT_DB_USER,
    password:
      process.env.HEARTBEAT_DB_PASSWORD || fallback.HEARTBEAT_DB_PASSWORD,
    database:
      process.env.HEARTBEAT_DB_DATABASE || fallback.HEARTBEAT_DB_DATABASE,
  });

  con.on('error', (err) => {
    console.error(err);
  });

  return con;
}

export function getDevices(con: mysql.Connection): Promise<any> {
  const sql = 'SELECT * FROM device WHERE enabled = true;';

  return new Promise<any>((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function updateMailSent(
  con: mysql.Connection,
  guid: string,
  mailSent: boolean,
): Promise<any> {
  const sql =
    'UPDATE device ' +
    'SET ' +
    'mail_sent = ' +
    mailSent +
    ' ' +
    'WHERE ' +
    "guid = '" +
    guid +
    "';";

  return new Promise<any>((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
