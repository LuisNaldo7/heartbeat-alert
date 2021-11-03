import nodemailer from 'nodemailer';

export async function sendMail(body: string): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: JSON.parse(process.env.MAIL_PORT || '587'),
    requireTLS: JSON.parse(process.env.MAIL_TLS || 'true'),
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASSWORD,
    },
    secure: false,
  });

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: process.env.MAIL_SUBJECT,
    text: body,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, result) => {
      if (err) {
        console.error('Sending email failed: ' + err);
        reject(false);
      }

      console.info('Email sent: ' + result.response);
      resolve(true);
    });
  });
}
