import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import Novel from "../../../models/Novel";
import User from "../../../models/User";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
  if (req.method === "DELETE") {
    try {
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
      const novel = await Novel.findByIdAndUpdate(review.novel, {
        $inc: {
          total_rating: -1 * parseFloat(review.rating),
          reviews_count: -1,
        },
      });
      const review_list = await Review.find(
        { novel: novel._id },
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
