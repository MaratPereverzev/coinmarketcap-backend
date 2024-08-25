interface IAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

type SearchParamsType = {
  [index: string | symbol]: string | number | undefined;
  search: string | undefined;
  id: string | undefined;
  ids: string | undefined;
  limit: number | undefined;
  offset: number | undefined;
};

export type { IAsset, SearchParamsType };
