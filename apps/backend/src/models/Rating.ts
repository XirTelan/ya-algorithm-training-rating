import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    userId: String,
    contestId: String,
    tasks: Number,
    fine: Number,
    tries: Number,
  },
  {
    timestamps: true,
  }
);

RatingSchema.index({ userId: 1, contestId: 1 }, { unique: true });
const Rating = mongoose.models.Rating || mongoose.model("Rating", RatingSchema);

export default Rating;
