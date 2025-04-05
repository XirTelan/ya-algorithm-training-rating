import mongoose, { Model } from "mongoose";
import { LogDTO } from "../../types";

const LogSchema = new mongoose.Schema<LogDTO>(
  {
    message: String,
    type: String,
  },
  {
    timestamps: true,
  }
);
const Log: Model<LogDTO> =
  mongoose.models.Log || mongoose.model("Log", LogSchema);

export default Log;
