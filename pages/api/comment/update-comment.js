import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/Comment";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "PUT") {
    await dbConnect();

    const comment_id = req.body.comment_id;
    const user_id = req.body.user_id;
    const comment_value = req.body.comment_value;

    const comment = await Comment.findById(comment_id, "user comment");
    if (!comment)
      return res.status(400).json({ success: false, error: "bad request" });

    if (JSON.stringify(comment.user) !== JSON.stringify(user_id))
      return res.status(401).json({
        success: false,
        error: "unauthorized",
      });

    if (comment.comment === comment_value)
      return res.status(400).json({
        success: false,
        error: "comment already exists",
      });

    await Comment.findByIdAndUpdate(comment._id, {
      comment: comment_value,
      date: new Date(),
    });
    return res
      .status(200)
      .json({ success: true, message: "comment successfully updated" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
