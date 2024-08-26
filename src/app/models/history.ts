import mongoose, { Schema } from "mongoose";
import type { IHistory } from "@/utils/types";

const HistorySchema = new Schema<IHistory>({
  id: String,
  timestamp: Number,
  priceUsd: String,
  date: Date,
});

const Histories =
  mongoose.models?.Histories || mongoose.model("Histories", HistorySchema);

export default Histories;
