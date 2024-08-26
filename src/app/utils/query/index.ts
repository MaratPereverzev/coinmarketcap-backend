type Indexable = {
  [index: string | symbol]: any;
};

const getQueryParams = <T extends Indexable>(
  searchParamsURL: URLSearchParams
): T => {
  const searchParamsArray: [string, string][] = Array.from(searchParamsURL);

  const result = searchParamsArray.reduce(
    (accum: Indexable, currentValue: [string, string]) => {
      accum[currentValue[0]] = currentValue[1];
      return accum;
    },
    {}
  );

  return result as T;
};

export { getQueryParams };
