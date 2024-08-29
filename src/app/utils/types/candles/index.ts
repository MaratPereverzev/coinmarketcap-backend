interface ICandle {
  baseId: string;
  quoteId: string;
  exchange: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  period: number;
}

type CandleSearchType = {
  exchange: string;
  interval: string;
  baseId: string;
  quoteId: string;
  start: number;
  end: number;
};

export type { ICandle, CandleSearchType };
