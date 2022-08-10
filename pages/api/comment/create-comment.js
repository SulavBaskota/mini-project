import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/Comment";
import User from "../../../models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "POST") {
    try {
      await dbConnect();
      await Comment.create(req.body);
      const comment_list = await Comment.find(
        { chapter: req.body.chapter },
        "user comment date"
      )
        .populate({ path: "user", select: "username imgUrl" })
        .sort({ date: 1 });
      return res.status(200).json({ success: true, data: comment_list });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
