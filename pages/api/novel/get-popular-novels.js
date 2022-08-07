import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    const novel_list = await Novel.find(
      {},
      "title img desc author view_count",
      {
        limit: 8,
      }
    )
      .populate({ path: "author", select: "firstname lastname" })
      .sort({
        view_count: -1,
      });

    let responseData = [];
    novel_list.forEach((novel) => {
      let data = {
        _id: novel._id,
        author: novel.author.firstname + " " + novel.author.lastname,
        title: novel.title,
        img: novel.img,
        desc: novel.desc,
        viewCount: novel.view_count,
      };
      responseData.push(data);
    });
    return res.status(200).json({ success: true, data: responseData });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
