import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const username = req.body.username;
        const user = await User.findOne({ username });

        if (user) {
          throw "Username not available";
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        const newUser = await User.create(req.body);
        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Failed to register" });
      break;
  }
}
