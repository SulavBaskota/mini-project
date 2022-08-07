import dbConnect from "../../../lib/dbConnect";
import Chapter from "../../../models/Chapter";
import { timeSince } from "../../../src/Utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    const recentlyUpdated = await Chapter.find(
      {},
      "title novel chapter_number created_on",
      { limit: 20 }
    )
      .populate({
        path: "novel",
        select: "title img",
      })
      .sort({ created_on: -1 });

    const responseData = [];
    recentlyUpdated.forEach((chapter) => {
      let data = {
        _id: chapter._id,
        novel_id: chapter.novel._id,
        title: chapter.novel.title,
        chapter: chapter.chapter_number,
        img: chapter.novel.img,
        chapterTitle: chapter.title,
        time: timeSince(chapter.created_on),
      };
      responseData.push(data);
    });
    return res.status(200).json({ success: true, data: responseData });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
