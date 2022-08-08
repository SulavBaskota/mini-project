import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");

  if (req.method === "GET") {
    try {
      await dbConnect();
      const { id } = req.query;
      const user = await User.findById(
        id,
        "username firstname lastname email imgUrl"
      );
      if (user) {
        return res.status(200).json({ success: true, data: user });
      }
      return res.status(404).json({ success: false, error: "user not found" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
