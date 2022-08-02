import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, imgUrl } = req.body;
    await dbConnect();
    const user = await User.findByIdAndUpdate(id, {
      imgUrl: imgUrl,
    });
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "profile image successfully updated" });
    }
    return res.status(404).json({ success: false, error: "user not found" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
