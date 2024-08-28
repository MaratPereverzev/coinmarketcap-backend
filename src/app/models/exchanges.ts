import mongoose, { Schema } from "mongoose";
import type { IExchange } from "@/utils";

const ExchangeSchema = new Schema<IExchange>({
  id: { type: String, unique: true, required: true },
  name: { type: String, default: "null" },
  rank: { type: String, default: "null" },
  percentTotalVolumne: { type: String, default: "null" },
  volumeUsd: { type: String, default: "null" },
  tradingPairs: { type: String, default: "null" },
  socket: { type: String, default: "null" },
  exchangeUrl: { type: String, default: "null" },
  updated: { type: Number, default: Date.now() },
});

const Exchanges =
  mongoose.models?.Exchanges || mongoose.model("Exchanges", ExchangeSchema);

export default Exchanges;
