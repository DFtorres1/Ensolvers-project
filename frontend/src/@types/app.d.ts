type QueryParams = {
  [k: string]: string | number | boolean;
};

type SearchParams = {
  limit: number;
  offset: number;
  order: "desc" | "asc";
  orderBy: string;
  search: string;
};

type Config = {
  defaultOrder: PaginationOrder;
  defaultOrderBy: string;
  defaultSearchValue: string;
  defaultRowsPerPage: number;
  rowsPerPageOptions: number[];
  showLoading: boolean;
};

type PaginationOrder = "desc" | "asc";

type TokenType = {
  userId: number;
  iat: number;
  exp: number;
};
