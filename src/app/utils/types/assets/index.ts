type AssetsSearchType = {
  [index: string | symbol]: string | number | undefined;
  search?: string;
  id?: string;
  ids?: string;
  limit?: number;
  offset?: number;
};

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

export type { AssetsSearchType, IAsset };
