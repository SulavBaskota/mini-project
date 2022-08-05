import dbConnect from "../../../lib/dbConnect";
import Comment from "../../../models/Comment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const comment = await Comment.create(req.body);
    return res.status(200).json({ success: true, data: comment });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
