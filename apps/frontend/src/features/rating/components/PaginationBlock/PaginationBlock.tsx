import { Button } from "@repo/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@repo/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

import usePagination from "../../hooks/usePagination";
import PaginationEllipsis from "./PaginationElipsis";
import PaginationPage from "./PaginationPage";

const PAGINATION_WINDOW = 5;

export default function PaginationBlock({
  pageCount,
  paginationWindow = PAGINATION_WINDOW,
}: {
  pageCount: number;
  paginationWindow?: number;
}) {
  const { page, activeIndex, paginationPages, navigateToPage } = usePagination(
    pageCount,
    paginationWindow
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const page = e.currentTarget.dataset.page
      ? Number(e.currentTarget.dataset.page)
      : 1;
    navigateToPage(page);
  };

  if (pageCount === 1) {
    return (
      <Pagination className=" grow">
        <PaginationContent>
          <PaginationPage
            pageNum={1}
            currentPage={page}
            onClick={handleClick}
          />
        </PaginationContent>
      </Pagination>
    );
  }

  return (
    <Pagination className=" grow max-w-full overflow-auto">
      <PaginationContent>
        <PaginationItem>
          <Button
            data-page={page - 1}
            disabled={page === 1}
            variant={"ghost"}
            onClick={handleClick}
          >
            <ChevronLeft />
            <span className=" hidden sm:block ">Назад</span>
          </Button>
        </PaginationItem>
        {pageCount > paginationWindow && (
          <PaginationPage
            pageNum={1}
            currentPage={page}
            onClick={handleClick}
          />
        )}

        {activeIndex > paginationWindow - 1 && (
          <PaginationEllipsis
            pageNum={activeIndex - paginationWindow}
            onClick={handleClick}
          />
        )}
        {paginationPages.map((pageNum) => (
          <PaginationPage
            itemProps={{ className: page != pageNum ? "hidden sm:block" : "" }}
            key={pageNum}
            pageNum={pageNum}
            currentPage={page}
            onClick={handleClick}
          />
        ))}
        {activeIndex < pageCount - paginationWindow - 1 && (
          <PaginationEllipsis
            pageNum={activeIndex + paginationWindow}
            onClick={handleClick}
          />
        )}

        {pageCount > paginationWindow && (
          <PaginationPage
            pageNum={pageCount}
            currentPage={page}
            onClick={handleClick}
          />
        )}
        <PaginationItem>
          <Button
            data-page={page + 1}
            disabled={page === pageCount}
            variant={"ghost"}
            onClick={handleClick}
          >
            <span className=" hidden sm:block ">Вперед</span>
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
