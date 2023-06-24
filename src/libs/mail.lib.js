const config_mail = require("../configs/mail.config");

const nodemailer = require("nodemailer");

const send_email = (to_email, subject_email, message) => {
  const transporter = nodemailer.createTransport(config_mail);

  transporter.verify((error, success) => {
    if (error) {
      return console.log(error);
    } else {
      console.log("Ready to send email.");
    }
  });

  const mail = {
    from: "seacinema@gmail.com",
    to: to_email,
    subject: subject_email,
    html: `
            <p>Kepada ${to_email}</p>

            <p>${message}</p>

            <span>Hormat Kami,</span>
            <br/>
            <span>SEA CINEMA</span>
        `,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("Failed send email");
    } else {
      console.log("Success send email");
    }
  });
};

module.exports = send_email;
