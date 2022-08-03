import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
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
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
