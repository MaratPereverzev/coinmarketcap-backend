interface IRate {
  id: string;
  symbol: string;
  currencySymbol: string;
  rateUsd: string;
  type: "fiat" | "crypto";
}

type RateSearchType = {
  [index: string | symbol]: string;
  id: string;
};

export type { IRate, RateSearchType };
