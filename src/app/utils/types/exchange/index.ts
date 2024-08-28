interface IExchange {
  id: string;
  name: string;
  rank: string;
  percentTotalVolumne: string;
  volumeUsd: string;
  tradingPairs: string;
  socket: string;
  exchangeUrl: string;
  updated: number;
}

type ExchangeSearchType = {
  [index: string | symbol]: string;
  id: string;
};

export type { IExchange, ExchangeSearchType };
