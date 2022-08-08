import dbConnect from "../../../lib/dbConnect";
import Review from "../../../models/Review";
import Novel from "../../../models/Novel";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (!token) return res.redirect("/401");
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

    await Review.create(req.body);
    await Novel.findByIdAndUpdate(novel_id, {
      $inc: { total_rating: req.body.rating, reviews_count: 1 },
    });

    return res
      .status(200)
      .json({ success: true, message: "review successfully created" });
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
