import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    message: String,
    type: String,
  },
  {
    timestamps: true,
  }
);
const Log = mongoose.models.Log || mongoose.model("Log", LogSchema);

export default Log;
