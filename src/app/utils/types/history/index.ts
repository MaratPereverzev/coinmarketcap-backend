type TimestampsType = {
  [index: string | symbol]: number;
  m1: number;
  m5: number;
  m15: number;
  m30: number;
  h1: number;
  h2: number;
  h6: number;
  h12: number;
  d1: number;
};

const timestampsValues: TimestampsType = {
  m1: 60000,
  m5: 60000 * 5,
  m15: 60000 * 15,
  m30: 60000 * 30,
  h1: 3600000,
  h2: 3600000 * 2,
  h6: 3600000 * 6,
  h12: 3600000 * 12,
  d1: 3600000 * 24,
};

interface IHistory {
  id: string;
  priceUsd: string;
  timestamp: number;
  date: Date;
}

type HistorySearchType = {
  [index: symbol | string]: string | number | undefined;
  id?: string;
  interval: string;
  start?: number;
  end?: number;
};

export type { IHistory, HistorySearchType };
export { timestampsValues };
