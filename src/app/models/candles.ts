import { ICandle } from "@/utils";
import mongoose, { Schema } from "mongoose";

const CandleSchema = new Schema<ICandle>({
  open: { type: String, default: "null" },
  high: { type: String, default: "null" },
  low: { type: String, default: "null" },
  close: { type: String, default: "null" },
  volume: { type: String, default: "null" },

  period: { type: Number, default: Date.now() },
});

const Candles =
  mongoose.models?.Candles || mongoose.model("Candles", CandleSchema);

export default Candles;
