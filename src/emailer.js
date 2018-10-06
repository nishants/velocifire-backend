const
    nodeMailer = require('nodemailer'),
    transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'velocifire.app@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    }),
    from = 'velocifire.app@gmail.com';

module.exports = {
  send: ({to, html, subject, onError, onSuccess}) => transporter.sendMail({
    from,
    to,
    subject,
    html
  }, function (err, info) {
    console.log("mail sending...")
    console.log("err", err)
    console.log("info", info)
    err? onError(err) : onSuccess(info);
  })
};
