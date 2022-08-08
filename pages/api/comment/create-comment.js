import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/Comment";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "POST") {
    try {
      await dbConnect();
      const comment = await Comment.create(req.body);
      return res.status(200).json({ success: true, data: comment });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
