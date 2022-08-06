import dbConnect from "../../../lib/dbConnect";
import Novel from "../../../models/Novel";

const statusFilterOption = {
  Any: { $in: ["Ongoing", "Completed", "Hiatus"] },
  Ongoing: "Ongoing",
  Completed: "Completed",
  Hiatus: "Hiatus",
};

const sortByFilterOption = {
  Name: { title: 1 },
  Popular: { view_count: -1 },
  New: { _id: -1 },
  Rating: { total_rating: -1, reviews_count: 1 },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const sort_by = req.body.sort_by;
    const status = req.body.status;
    const genres = req.body.genres;

    let filterOption = {
      status: statusFilterOption[status],
    };

    if (genres.length !== 0) filterOption.genre = { $in: genres };

    const novel_list = await Novel.find(
      filterOption,
      "title img status genre desc total_rating reviews_count"
    ).sort(sortByFilterOption[sort_by]);


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
        data.rating = (novel.total_rating / novel.reviews_count).toPrecision(2);

      responseData.push(data);
    });
    return res.status(200).json({ success: true, data: responseData });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
