import dbConnect from "../../../../lib/dbConnect";
import Novel from "../../../../models/Novel";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    const { aid } = req.query;
    const novels = await Novel.find(
      { author: aid },
      "img title status last_chapter updated_on total_rating review_count"
    );
    if (novels) {
      let responseData = [];
      novels.forEach((novel) => {
        let data = {
          _id: novel._id,
          title: novel.title,
          img: novel.img,
          status: novel.status,
          last_chapter: novel.last_chapter,
          updated_on: moment(novel.updated_on).fromNow(),
        };
        if (novel.total_rating === 0) data.rating = 0;
        else data.rating = novel.total_rating / novel.reviews_count;
        responseData.push(data);
      });
      return res.status(200).json({ success: true, data: responseData });
    }
    return res.status(404).json({ success: false, error: "novel not found" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
