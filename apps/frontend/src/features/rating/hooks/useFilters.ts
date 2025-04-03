import { getRouteApi, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";

const routerApi = getRouteApi("/");
const useFilters = () => {
  const routeSearch = routerApi.useSearch();

  const setFilter = useCallback((key: string, value: string) => {}, []);
  return routeSearch;
};

export default useFilters;
