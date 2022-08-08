import dbConnect from "../../../lib/dbConnect";
import Chapter from "../../../models/Chapter";
import Novel from "../../../models/Novel";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");

  if (req.method === "POST") {
    await dbConnect();
    const novel_id = req.body.novel;
    const author_id = req.body.author;
    const chapter_number = req.body.chapter_number;
    const chapter_title = req.body.title;
    const chapter_content = req.body.content;

    const novel = await Novel.findOne(
      { _id: novel_id, author: author_id },
      "last_chapter"
    );
    if (!novel || parseInt(novel.last_chapter) + 1 !== parseInt(chapter_number))
      return res.status(400).json({ success: false, error: "bad request" });

    await Novel.findByIdAndUpdate(novel._id, {
      last_chapter: parseInt(chapter_number),
      updated_on: new Date(),
    });

    await Chapter.create({
      title: chapter_title,
      novel: novel._id,
      content: chapter_content,
      chapter_number: parseInt(chapter_number),
    });
    return res
      .status(200)
      .json({ success: true, message: "chapter successfully created" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
