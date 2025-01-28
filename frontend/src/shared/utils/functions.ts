import { jwtDecode } from "jwt-decode";

export const generateQueryKeys = (queryKey: string) => ({
  all: [queryKey],
  details: () => [queryKey, "details"],
  detail: (id?: number) => [...generateQueryKeys(queryKey).details(), id],
  lists: () => [queryKey, "lists"],
  filteredList: (params: QueryParams) => [
    ...generateQueryKeys(queryKey).lists(),
    params,
  ],
});

export const getDecodedToken = () => {
  const token = sessionStorage.getItem("token");
  return token ? jwtDecode<TokenType>(token) : null;
};

export const removeSessionToken = () => {
  sessionStorage.removeItem("token");
};

export const isValidToken = () => {
  const currentTime = new Date();
  const token = getDecodedToken();
  const unixCurrentTime = Math.floor(currentTime.getTime() / 1000);
  if (!token || token.exp <= unixCurrentTime) {
    removeSessionToken();
    return false;
  }

  return true;
};

export const getPaginationConfig = (
  orderBy: string,
  order?: "asc" | "desc"
): Partial<Config> => ({
  defaultOrder: order ?? "asc",
  defaultOrderBy: orderBy,
});

export const getDefaultCriteria = (
  paginationConfig: Partial<Config>
): QueryParams => {
  return {
    order: paginationConfig.defaultOrder as PaginationOrder,
    orderBy: paginationConfig.defaultOrderBy ?? "",
    searchValue: "",
  };
};

export const setCriteriaParamsBySearchParams = (searchParams: SearchParams) => {
  const currentParams: QueryParams = {
    ...searchParams,
    searchValue: searchParams.search,
  };
  if ("search" in currentParams) delete currentParams.search;
  return currentParams;
};
