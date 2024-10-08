import mongoose, { Schema } from "mongoose";
import type { IAsset } from "@/utils/types";

const AssetSchema = new Schema<IAsset>(
  {
    id: { type: String, unique: true, require: true },
    rank: { type: String, default: "null" },
    symbol: { type: String, default: "null" },
    name: { type: String, default: "null" },
    supply: { type: String, default: "null" },
    maxSupply: { type: String, default: "null" },
    marketCapUsd: { type: String, default: "null" },
    volumeUsd24Hr: { type: String, default: "null" },
    priceUsd: { type: String, default: "null" },
    changePercent24Hr: { type: String, default: "null" },
    vwap24Hr: { type: String, default: "null" },
  },
  {
    timestamps: { currentTime: () => Date.now() },
    minimize: false,
    strict: false,
  }
);

const Assets = mongoose.models?.Assets || mongoose.model("Assets", AssetSchema);

export default Assets;
