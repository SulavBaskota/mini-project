import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");

  if (req.method === "PUT") {
    await dbConnect();
    const { id, desc, genre, status, img } = req.body;

    const novel = await Novel.findByIdAndUpdate(id, {
      desc: desc,
      genre: genre,
      status: status,
      img: img,
      updated_on: new Date(),
    });

    if (!novel)
      return res.status(400).json({ success: false, error: "novel not found" });
    return res
      .status(201)
      .json({ success: true, message: "novel successfully updated" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
