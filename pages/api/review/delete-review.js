import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import Novel from "../../../models/Novel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();

    const review_id = req.body.review_id;
    const user_id = req.body.user_id;

    const review = await Review.findById(review_id, "user novel rating");
    if (!review)
      return res.status(400).json({ success: false, error: "bad request" });

    if (JSON.stringify(review.user) !== JSON.stringify(user_id))
      return res.status(401).json({
        success: false,
        error: "unauthorized",
      });
    await Review.findByIdAndDelete(review._id);
    await Novel.findByIdAndUpdate(review.novel, {
      $inc: { total_rating: -1 * parseFloat(review.rating), reviews_count: -1 },
    });
    return res
      .status(200)
      .json({ success: true, message: "review successfully updated" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
