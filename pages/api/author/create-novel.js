import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");

  if (req.method === "POST") {
    try {
      await dbConnect();
      const title = req.body.title;
      const novel = await Novel.findOne({ title });

      if (novel)
        return res
          .status(400)
          .json({ success: false, error: "title not available" });

      const newNovel = await Novel.create(req.body);
      return res.status(201).json({ success: true, data: newNovel });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
