import dbConnect from "../../../lib/dbConnect";
import Bookmark from "../../../models/Bookmark";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "DELETE") {
    try {
      await dbConnect();
      const bookmark_id = req.body.bookmark_id;
      const bookmark = await Bookmark.findByIdAndDelete(bookmark_id);
      if (!bookmark)
        return res.status(400).json({ success: false, error: "bad request" });

      return res
        .status(200)
        .json({ success: true, message: "bookmark successfully deleted" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
