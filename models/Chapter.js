import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
  title: String,
  novel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel" },
  content: String,
  chapter_number: Number,
  created_on: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Chapter || mongoose.model("Chapter", ChapterSchema);
