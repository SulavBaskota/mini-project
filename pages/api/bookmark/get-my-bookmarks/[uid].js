import dbConnect from "../../../../lib/dbConnect";
import Bookmark from "../../../../models/Bookmark";
import Novel from "../../../../models/Novel";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "GET") {
    await dbConnect();

    const { uid } = req.query;

    const bookmark_list = await Bookmark.find({ user: uid }).populate({
      path: "novel",
      select: "title last_chapter img",
    });
    return res.status(200).json({ success: true, data: bookmark_list });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
