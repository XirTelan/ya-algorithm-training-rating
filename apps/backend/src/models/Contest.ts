import mongoose, { Model } from "mongoose";
import { ContestDTO } from "../../types";
const ContestStatsSchema = new mongoose.Schema(
  {
    task: String,
    success: Number,
    attempts: Number,
  },
  { _id: false }
);

const ContestSchema = new mongoose.Schema<ContestDTO>(
  {
    contestTitle: String,
    contestId: {
      type: String,
      required: true,
      unique: true,
    },
    autoUpdate: Number,
    attempts: String,
    date: Number,
    status: String,
    stats: [ContestStatsSchema],
  },
  {
    timestamps: true,
  }
);
const Contest: Model<ContestDTO> =
  mongoose.models.Contest || mongoose.model("Contest", ContestSchema);

export default Contest;
