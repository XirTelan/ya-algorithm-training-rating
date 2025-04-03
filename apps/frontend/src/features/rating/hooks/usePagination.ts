import { Route } from "@/routes";
import { clamp } from "@/utils";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function usePagination(pageCount: number) {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [activeIndex, setActiveIndex] = useState(page);

  useEffect(() => {
    setActiveIndex(page);
  }, [page]);

  const paginationPages = useMemo(() => {
    if (pageCount <= 1) return [];

    let first = Math.max(2, activeIndex - 2);
    if (activeIndex >= pageCount - 4) {
      first = pageCount - 5;
    }

    const activeIndexLow = Math.max(activeIndex, first);

    let last = Math.min(activeIndexLow + 2, pageCount - 1);
    if (activeIndex <= 5) {
      last = first + 4;
    }
    let generate: number[] = [];
    if (last - first > 0) {
      generate = Array.from({ length: last - first - 1 }).map(
        (_, i) => i + first + 1
      );
    }
    return [first, ...generate, last];
  }, [activeIndex]);

  const navigateToPage = useCallback((newPage: number) => {
    navigate({
      search: (prev) => ({
        page: clamp(newPage, 1, pageCount),
      }),
    });
  }, []);

  return {
    page,
    activeIndex,
    paginationPages,
    setActiveIndex,
    navigateToPage,
  };
}
