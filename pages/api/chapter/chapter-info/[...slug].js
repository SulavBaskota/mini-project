import dbConnect from "../../../../lib/dbConnect";
import Chapter from "../../../../models/Chapter";
import Novel from "../../../../models/Novel";
import Comment from "../../../../models/Comment";
import Bookmark from "../../../../models/Bookmark";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    const { slug } = req.query;
    const novel_id = slug[0];
    const chapter_number = slug[1];

    if (!novel_id || !chapter_number)
      return res.status(400).json({ success: false, error: "bad request" });

    const user_id = slug[2];

    const chapter = await Chapter.findOne({
      novel: novel_id,
      chapter_number: chapter_number,
    }).populate({ path: "novel", select: "title last_chapter" });

    if (!chapter)
      return res
        .status(404)
        .json({ success: false, error: "chapter not found" });

    await Novel.findByIdAndUpdate(novel_id, {
      $inc: { view_count: 1 },
    });

    if (user_id !== "null") {
      await Bookmark.findOneAndUpdate(
        {
          user: user_id,
          novel: novel_id,
        },
        { bookmark: chapter_number },
        {
          new: true,
          upsert: true,
        }
      );
    }

    const comment_list = await Comment.find(
      { chapter: chapter._id },
      "user comment date"
    )
      .populate({ path: "user", select: "username imgUrl" })
      .sort({ date: 1 });

    const responseData = {
      _id: chapter._id,
      novel_id: chapter.novel._id,
      novel_title: chapter.novel.title,
      chapter_title: chapter.title,
      chapter_content: chapter.content,
      chapter_number: chapter.chapter_number,
      previous_chapter: chapter.chapter_number === 1 ? false : true,
      next_chapter:
        chapter.novel.last_chapter > chapter.chapter_number ? true : false,
      comment_list: comment_list,
    };
    return res.status(200).json({ success: true, data: responseData });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
