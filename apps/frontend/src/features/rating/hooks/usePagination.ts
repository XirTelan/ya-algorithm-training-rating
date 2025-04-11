import { Route } from "@/routes";
import { clamp } from "@/utils";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";

export function usePagination(pageCount: number, pageWindow: number = 5) {
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [activeIndex, setActiveIndex] = useState(page);

  useEffect(() => {
    setActiveIndex(page);
  }, [page]);

  const paginationPages = useMemo(() => {
    if (pageCount <= 1) return [];

    const mid = Math.floor(pageWindow / 2);

    let first = Math.max(2, activeIndex - mid);

    if (activeIndex > pageCount - pageWindow) {
      first = Math.max(1, pageCount - pageWindow);
    }

    const activeIndexLow = Math.max(activeIndex, first);

    let last = Math.min(activeIndexLow + mid, pageCount - 1);
    if (activeIndex <= pageWindow) {
      last = Math.min(first + pageWindow - 1, pageCount);
    }
    let pagesInWindow: number[] = [];
    if (last - first > 0) {
      pagesInWindow = Array.from({ length: last - first - 1 }).map(
        (_, i) => i + first + 1
      );
    }
    return [first, ...pagesInWindow, last];
  }, [activeIndex, pageCount, pageWindow]);

  const navigateToPage = useCallback(
    (newPage: number) => {
      navigate({
        search: (prev) => ({
          ...prev,
          page: clamp(newPage, 1, pageCount),
        }),
      });
    },
    [navigate, pageCount]
  );

  return {
    page,
    activeIndex,
    paginationPages,
    setActiveIndex,
    navigateToPage,
  };
}
