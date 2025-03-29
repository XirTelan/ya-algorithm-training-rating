import { getRouteApi, useSearch } from "@tanstack/react-router";

const routerApi = getRouteApi("/");
const useFilters = () => {
  const routeSearch = routerApi.useSearch();

  return routeSearch;
};

export default useFilters;
