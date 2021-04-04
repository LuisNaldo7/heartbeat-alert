import nodemailer, { TransportOptions } from 'nodemailer';

export function sendMail(body: string): Promise<boolean> {
  let transporter = nodemailer.createTransport({
    host: process.env.HEARTBEAT_MAIL_HOST,
    port: JSON.parse(process.env.HEARTBEAT_MAIL_PORT || '587'),
    requireTLS: JSON.parse(process.env.HEARTBEAT_MAIL_TLS || 'true'),
    auth: {
      user: process.env.HEARTBEAT_MAIL_FROM,
      pass: process.env.HEARTBEAT_MAIL_PASSWORD,
    },
    secure: false,
  });

  const mailOptions = {
    from: process.env.HEARTBEAT_MAIL_FROM,
    to: process.env.HEARTBEAT_MAIL_TO,
    subject: process.env.HEARTBEAT_MAIL_SUBJECT,
    text: body,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, result) => {
      if (err) {
        reject(err);
      }

      console.log('Email sent: ' + result.response);
      resolve(result);
    });
  });
}
