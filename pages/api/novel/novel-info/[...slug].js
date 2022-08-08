import dbConnect from "../../../../lib/dbConnect";
import Novel from "../../../../models/Novel";
import User from "../../../../models/User";
import Chapter from "../../../../models/Chapter";
import Review from "../../../../models/Review";
import Bookmark from "../../../../models/Bookmark";

const recommendationValue = {
  0: "Unrated",
  1: "Negative",
  2: "Mostly Negative",
  3: "Mixed",
  4: "Mostly Positive",
  5: "Highly Recommended",
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const { slug } = req.query;
      const novelId = slug[0];
      const userId = slug[1];

      const novel = await Novel.findById(novelId);
      if (novel) {
        const author = await User.findById(novel.author, "firstname lastname");
        const chapter_list = await Chapter.find(
          { novel: novel._id },
          "title chapter_number"
        );
        const review_list = await Review.find(
          { novel: novel._id },
          "user rating review date"
        )
          .populate({ path: "user", select: "username imgUrl" })
          .sort({ date: -1 });
        let responseData = {
          _id: novel._id,
          title: novel.title,
          img: novel.img,
          status: novel.status,
          author_id: novel.author,
          author_name: author.firstname + " " + author.lastname,
          last_chapter: novel.last_chapter,
          genre: novel.genre,
          desc: novel.desc,
          chapter_list: chapter_list,
          review_list: review_list,
        };

        if (userId !== "null") {
          const bookmark = await Bookmark.findOne(
            {
              user: userId,
              novel: novelId,
            },
            "bookmark"
          );
          if (bookmark) responseData.bookmark = bookmark.bookmark;
        }
        if (novel.total_rating === 0) responseData.rating = 0;
        else
          responseData.rating = (
            novel.total_rating / novel.reviews_count
          ).toPrecision(2);
        responseData.recommendation =
          recommendationValue[Math.round(responseData.rating)];
        return res.status(200).json({ success: true, data: responseData });
      }
      return res.status(404).json({ success: false, error: "novel not found" });
    } catch {
      console.log(error);
      return res.status(400).json({ success: false, error: "bad request" });
    }
  }
  return res.status(400).json({ success: false, error: "bad request" });
}
