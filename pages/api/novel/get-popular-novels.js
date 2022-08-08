import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const novel_list = await Novel.find(
        {},
        "title img desc author view_count total_rating reviews_count",
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
        if (novel.total_rating === 0) data.rating = 0;
        else
          data.rating = (novel.total_rating / novel.reviews_count).toPrecision(
            2
          );
        responseData.push(data);
      });
      responseData.sort((a, b) => {
        if (a.viewCount === b.viewCount) return b.rating - a.rating;
        return b.viewCount - a.viewCount;
      });
      return res.status(200).json({ success: true, data: responseData });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ success: true, data: responseData });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
