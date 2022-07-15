const generatePassword = (letters = 5, numbers = 3, either = 2) => {
  var chars = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  ];

  return [letters, numbers, either]
    .map((len, i) => {
      return Array(len)
        .fill(chars[i])
        .map(function (x) {
          return x[Math.floor(Math.random() * x.length)];
        })
        .join("");
    })
    .concat()
    .join("")
    .split("")
    .sort(() => {
      return 0.5 - Math.random();
    })
    .join("");
};

export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, email } = req.body;

    if (username === "sulav" && email === "sulav.baskota0419@gmail.com") {
      let newPassword = generatePassword();
      let nodemailer = require("nodemailer");

      let message = `Hi ${username},\n You recently requested to reset your password for your ReadHub account.\n
      Your new password is ${newPassword}\nPlease change this password after you login to your account.\nThanks,\nThe ReadHub Team`;

      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: "readhub99",
          pass: process.env.nodemailer_password,
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

      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });
      res.status(200).json({ message: "success" });
    } else {
      res.status(500).json({
        error: "incorrect username or email",
      });
    }
  }
}
