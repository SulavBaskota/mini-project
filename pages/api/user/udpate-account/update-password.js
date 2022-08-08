import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "PUT") {
    const { id, oldPassword, newPassword } = req.body;
    await dbConnect();
    const user = await User.findById(id, "password");
    if (!user)
      return res.status(404).json({ success: false, error: "user not found" });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, error: "incorrect password" });
    const hash = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(id, { password: hash });
    return res
      .status(200)
      .json({ success: true, message: "name successfully updated" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
