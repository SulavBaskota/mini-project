import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const novel_list = await Novel.find(
        { status: "Completed" },
        "title img desc",
        {
          limit: 9,
        }
      ).sort({ updated_on: -1 });

      let responseData = [];
      novel_list.forEach((novel) => {
        let data = {
          _id: novel._id,
          title: novel.title,
          img: novel.img,
          desc: novel.desc,
        };
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
