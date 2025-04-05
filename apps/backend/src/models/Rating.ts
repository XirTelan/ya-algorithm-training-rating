import mongoose, { Model } from "mongoose";
import { RatingDTO } from "../../types";

const RatingSchema = new mongoose.Schema<RatingDTO>(
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
RatingSchema.index({ totalTasks: -1, totalTries: 1, totalFine: 1 });
const Rating: Model<RatingDTO> =
  mongoose.models.Rating || mongoose.model("Rating", RatingSchema);

export default Rating;
