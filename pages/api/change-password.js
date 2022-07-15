import { generatePassword } from "../../src/Utils";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, email } = req.body;

    if (username === "sulav" && email === "sulav.baskota0419@gmail.com") {
      let nodemailer = require("nodemailer");
      let newPassword = generatePassword();

      let message = `Hi ${username},\n You recently requested to reset your password for your ReadHub account.\n
      Your new password is ${newPassword}\nPlease change this password after you login to your account.\nThanks,\nThe ReadHub Team`;

      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: "readhub99",
          pass: process.env.GMAIL_PASS,
        },
        secure: true,
      });

      const mailData = {
        from: "readhub99@gmail.com",
        to: email,
        subject: "Account Password Changed",
        text: message,
        html: `<div>Hi ${username},<br /> You recently requested to reset your password for your ReadHub account.<br />
        Your new password is <b>${newPassword}</b><br />Please change this password after you login to your account.<br />Thanks,<br />The ReadHub Team</div>`,
      };

      const result = async () =>
        await transporter
          .sendMail(mailData)
          .then((info) => {
            console.log(info);
            return res
              .status(200)
              .json({ message: "email successfully sent." });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "failed to send email." });
          });

      return result();
    } else {
      res.status(500).json({
        error: "invalid username or email",
      });
    }
  }
}
