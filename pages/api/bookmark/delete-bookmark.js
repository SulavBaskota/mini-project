import dbConnect from "../../../lib/dbConnect";
import Bookmark from "../../../models/Bookmark";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const bookmark_id = req.body.bookmark_id;
    const bookmark = await Bookmark.findByIdAndDelete(bookmark_id);
    if (!bookmark)
      return res.status(400).json({ success: false, error: "bad request" });

    return res
      .status(200)
      .json({ success: true, message: "bookmark successfully deleted" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
