import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";
import { passwordRegex, emailRegex } from "../../src/Utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const username = req.body.username;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const password = req.body.password;
      const email = req.body.email;
      const userrole = req.body.userrole;

      if (!firstname)
        throw {
          errorType: "firstname",
          message: "First Name can not be empty",
        };
      if (!lastname)
        throw { errorType: "lastname", message: "Last Name can not be empty" };
      if (!username)
        throw { errorType: "username", message: "Username can not be empty" };
      if (!password)
        throw { errorType: "password", message: "Password can not be empty" };
      if (!email)
        throw { errorType: "email", message: "Email can not be empty" };
      if (!userrole)
        throw { errorType: "userrole", message: "Userrole can not be empty" };

      if (!password.match(passwordRegex))
        throw {
          errorType: "password",
          message:
            "Password must be 8 to 20 character which contains at least one numeric digit, one uppercase and one lowercase letter",
        };

      if (!email.match(emailRegex))
        throw {
          errorType: "email",
          message: "Invalid email address",
        };

      if (userrole !== "author" && userrole !== "reader")
        throw {
          errorType: "userrole",
          message: "Ivalid userrole",
        };

      const user = await User.findOne({ username });

      if (user) {
        throw { errorType: "username", message: "Username not available" };
      }

      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      const newUser = await User.create(req.body);
      return res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error });
    }
  }
  return res.redirect("/400");
}
