import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const title = req.body.title;
    const novel = await Novel.findOne({ title });

    if (novel)
      return res
        .status(400)
        .json({ success: false, error: "title not available" });

    const newNovel = await Novel.create(req.body);
    return res.status(201).json({ success: true, data: newNovel });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
