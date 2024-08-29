import mongoose, { Schema } from "mongoose";
import type { IRate } from "@/utils/types";

const RateSchema = new Schema<IRate>(
  {
    id: { type: String, required: true },
    symbol: { type: String, default: "null" },
    currencySymbol: { type: String, default: "null" },
    rateUsd: { type: String, default: "null" },
    type: { type: String, default: "fiat" },
  },
  { strict: false }
);

const Rates = mongoose.models?.Rates || mongoose.model("Rates", RateSchema);

export default Rates;
