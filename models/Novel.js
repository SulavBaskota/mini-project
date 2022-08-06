import mongoose from "mongoose";

const NovelSchema = new mongoose.Schema({
  title: String,
  img: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Ongoing", "Completed", "Hiatus"],
    default: "Ongoing",
  },
  desc: String,
  genre: [
    {
      type: String,
      enum: [
        "Action",
        "Fantasy",
        "Thriller",
        "Horror",
        "Sci Fi",
        "Mystery",
        "Romance",
        "Comedy",
        "Dystopian",
      ],
    },
  ],
  last_chapter: { type: Number, default: 0 },
  updated_on: { type: Date, default: Date.now },
  total_rating: { type: Number, default: 0 },
  reviews_count: { type: Number, default: 0 },
  view_count: { type: Number, default: 0 },
});

module.exports = mongoose.models.Novel || mongoose.model("Novel", NovelSchema);
