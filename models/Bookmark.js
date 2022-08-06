import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  novel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel" },
  bookmark: Number,
});

module.exports =
  mongoose.models.Bookmark || mongoose.model("Bookmark", BookmarkSchema);
