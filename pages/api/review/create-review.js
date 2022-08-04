import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import Novel from "../../../models/Novel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const user_id = req.body.user;
    const novel_id = req.body.novel;

    const review = await Review.findOne({ user: user_id, novel: novel_id });
    if (review)
      return res.status(400).json({
        success: false,
        error: "review already exists",
      });

    const newReview = await Review.create(req.body);
    const updatedNovel = await Novel.findByIdAndUpdate(novel_id, {
      $inc: { total_rating: req.body.rating, reviews_count: 1 },
    });
    console.log("review : ", newReview);
    console.log("updatedNovel: ", updatedNovel);

    return res
      .status(200)
      .json({ success: true, message: "chapter successfully created" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
