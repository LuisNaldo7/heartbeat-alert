import * as mysql from 'mysql';

export function getConnection(): mysql.Connection {
  let con = mysql.createConnection({
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

export function getDatasets(con: mysql.Connection): Promise<any> {
  let sql = 'SELECT * FROM devices;';

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
