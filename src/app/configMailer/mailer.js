const nodemailer = require("nodemailer");

exports.sendEmail = async function (user, subject, content) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASSWORD,
    },
  });

  const config = {
    from: process.env.GOOGLE_USER,
    to: user.email,
    subject: subject,
    text: "You received message from " + process.env.GOOGLE_USER,
    html: `<h3>Hello ${user.username}</h3>
    <p>You received message from ${process.env.GOOGLE_USER} with: </p>
    <p>Username: ${user.username}</p>
    <p>Email: ${user.email}</p>
    ${content}`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(config, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Message send: ", info);
        resolve(info);
      }
    });
  });
};
