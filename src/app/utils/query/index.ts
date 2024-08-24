import { SearchParamsType } from "../types";

const getQueryParams = (searchParamsURL: URLSearchParams): SearchParamsType => {
  return Array.from(searchParamsURL).reduce(
    (accum: SearchParamsType, currentValue: string[]): SearchParamsType => {
      accum[currentValue[0]] = currentValue[1];
      return accum;
    },
    <SearchParamsType>{}
  );
};

export { getQueryParams };
