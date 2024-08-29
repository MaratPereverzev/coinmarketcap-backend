interface IMarket {
  exchangeId: string;
  rank: string;
  baseSymbol: string;
  baseId: string;
  quoteSymbol: string;
  quoteId: string;
  priceQuote: string;
  priceUsd: string;
  volumeUsd24Hr: string;
  percentExchangeVolume: string;
  tradesCount24Hr: string;
  updated: number;
  volumePercent: string;
}

type MarketSearchType = {
  exchangeId: string;
  baseSymbol: string;
  quoteSymbol: string;
  baseId: string;
  quoteId: string;
  assetSymbol: string;
  limit: number;
  offset: number;
};

export type { IMarket, MarketSearchType };
