import * as mysql from 'mysql';

export function getConnection(): mysql.Connection {
  const con = mysql.createConnection({
    host: process.env.HEARTBEAT_DB_HOST,
    port: parseInt(process.env.HEARTBEAT_DB_PORT || '3306'),
    ssl: JSON.parse(process.env.HEARTBEAT_DB_SSL || 'true'),
    user: process.env.HEARTBEAT_DB_USER,
    password: process.env.HEARTBEAT_DB_PASSWORD,
    database: process.env.HEARTBEAT_DB_DATABASE,
  });

  con.on('error', (err) => {
    console.error(err);
  });

  return con;
}

export function getDevices(con: mysql.Connection): Promise<any> {
  const sql = 'SELECT * FROM devices WHERE enabled = true;';

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
    'UPDATE devices ' +
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
