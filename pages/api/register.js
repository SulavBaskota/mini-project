import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const username = req.body.username;
      const user = await User.findOne({ username });

      if (user) {
        throw "Username not available";
      }
      const hash = await bcrypt.hash(req.body.password, 10);
      req.body.password = hash;
      const newUser = await User.create(req.body);
      return res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      return res.status(400).json({ success: false, error: error });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
