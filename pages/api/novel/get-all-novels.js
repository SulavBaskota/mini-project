import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const novel_list = await Novel.find(
        {},
        "title img status genre desc total_rating reviews_count"
      ).sort({ title: 1 });
      if (!novel_list)
        return res.status(400).json({ success: false, error: "bad request" });

      let responseData = [];
      novel_list.forEach((novel) => {
        let data = {
          _id: novel._id,
          title: novel.title,
          img: novel.img,
          desc: novel.desc,
          status: novel.status,
          genre: novel.genre,
        };
        if (novel.total_rating === 0) data.rating = 0;
        else
          data.rating = (novel.total_rating / novel.reviews_count).toPrecision(
            2
          );
        responseData.push(data);
      });
      return res.status(200).json({ success: true, data: responseData });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
