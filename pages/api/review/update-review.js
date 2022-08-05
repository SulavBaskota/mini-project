import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import Novel from "../../../models/Novel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const user_id = req.body.user;
    const novel_id = req.body.novel;

    const review = await Review.findOne({
      user: user_id,
      novel: novel_id,
    });
    if (review.review === req.body.review && review.rating === req.body.rating)
      return res.status(400).json({
        success: false,
        error: "review already exists",
      });

    await Review.findByIdAndUpdate(review._id, {
      review: req.body.review,
      rating: req.body.rating,
      date: new Date(),
    });
    await Novel.findByIdAndUpdate(novel_id, {
      $inc: { total_rating: req.body.rating - review.rating },
    });

    return res
      .status(200)
      .json({ success: true, message: "review successfully updated" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
