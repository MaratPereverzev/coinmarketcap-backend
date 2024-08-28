import mongoose, { Schema } from "mongoose";
import { IMarket } from "@/utils/types";

const MarketSchema = new Schema<IMarket>({
  exchangeId: { type: String, default: "null" },
  rank: { type: String, default: "null" },
  baseSymbol: { type: String, default: "null" },
  baseId: { type: String, default: "null", unique: true },
  quoteSymbol: { type: String, default: "null" },
  quoteId: { type: String, default: "null" },
  priceQuote: { type: String, default: "null" },
  priceUsd: { type: String, default: "null" },
  volumeUsd24Hr: { type: String, default: "null" },
  percentExchangeVolume: { type: String, default: "null" },
  tradesCount24Hr: { type: String, default: "null" },
  updated: { type: Number, default: Date.now() },
});

const Markets =
  mongoose.models?.Markets || mongoose.model("Markets", MarketSchema);

export default Markets;
