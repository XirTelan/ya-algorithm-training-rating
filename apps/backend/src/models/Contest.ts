import mongoose from "mongoose";
const ContestStatsSchema = new mongoose.Schema(
  {
    task: String,
    success: Number,
    attempts: Number,
  },
  { _id: false }
);

const ContestSchema = new mongoose.Schema(
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
const Contest =
  mongoose.models.Contest || mongoose.model("Contest", ContestSchema);

export default Contest;
