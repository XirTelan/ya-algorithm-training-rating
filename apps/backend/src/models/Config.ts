import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    value: String,
  },
  {
    timestamps: true,
  }
);
const Config = mongoose.models.Config || mongoose.model("Config", ConfigSchema);

export default Config;
