import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  novel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  review: String,
  date: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
