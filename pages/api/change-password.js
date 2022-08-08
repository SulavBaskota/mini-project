import { generatePassword } from "../../src/Utils";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { username, email } = req.body;
      await dbConnect();

      const user = await User.findOne({ username }, "username email");
      if (user && username === user.username && email === user.email) {
        let newPassword = generatePassword();

        let message = `Hi ${username},\n You recently requested to reset your password for your ReadHub account.\n
      Your new password is ${newPassword}\nPlease change this password after you login to your account.\n\nThanks,\nThe ReadHub Team`;

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
        Your new password is <b>${newPassword}</b><br />Please change this password after you login to your account.<br /><br />Thanks,<br />The ReadHub Team</div>`,
        };
        const hash = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ username: username }, { password: hash });
        const result = async () =>
          await transporter
            .sendMail(mailData)
            .then((info) => {
              console.log(info);
              return res
                .status(200)
                .json({ success: true, message: "email successfully sent." });
            })
            .catch((err) => {
              console.log(err);
              return res
                .status(500)
                .json({ success: false, error: "failed to send email." });
            });
        return result();
      } else {
        return res
          .status(500)
          .json({ success: false, error: "invalid username or email" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
