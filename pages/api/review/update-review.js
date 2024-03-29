import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import Novel from "../../../models/Novel";
import User from "../../../models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "PUT") {
    try {
      await dbConnect();

      const user_id = req.body.user;
      const novel_id = req.body.novel;

      const review = await Review.findOne({
        user: user_id,
        novel: novel_id,
      });
      if (
        review.review === req.body.review &&
        review.rating === req.body.rating
      )
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

      const review_list = await Review.find(
        { novel: novel_id },
        "user rating review date"
      )
        .populate({ path: "user", select: "username imgUrl" })
        .sort({ date: -1 });
      return res.status(200).json({ success: true, data: review_list });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
