import { Button } from "@repo/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@repo/ui/pagination";
import { ChevronLeft, ChevronRight, MoreHorizontalIcon } from "lucide-react";

import usePagination from "../hooks/usePagination";

export default function PaginationBlock({ pageCount }: { pageCount: number }) {
  const { page, activeIndex, paginationPages, setActiveIndex, navigateToPage } =
    usePagination(pageCount);

  return (
    <Pagination className=" grow">
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={page === 1}
            variant={"ghost"}
            onClick={() => navigateToPage(page - 1)}
          >
            <ChevronLeft />
            Previous
          </Button>
        </PaginationItem>
        {pageCount > 5 && (
          <PaginationItem>
            <Button
              variant={activeIndex === 1 ? "outline" : "ghost"}
              onClick={() => {
                navigateToPage(1);
              }}
            >
              {1}
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
      <PaginationContent>
        {activeIndex > 4 && (
          <PaginationItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                setActiveIndex(activeIndex - 5);
              }}
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </PaginationItem>
        )}
        {paginationPages.map((pageNum, indx) => (
          <PaginationItem key={indx}>
            <Button
              variant={pageNum === page ? "outline" : "ghost"}
              className="w-10 h-10"
              onClick={() => navigateToPage(pageNum)}
            >
              {pageNum}
            </Button>
          </PaginationItem>
        ))}
        {activeIndex < pageCount - 4 && (
          <PaginationItem>
            <Button
              variant={"ghost"}
              onClick={() => {
                setActiveIndex(activeIndex + 5);
              }}
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
      <PaginationContent>
        {pageCount > 5 && (
          <PaginationItem>
            <Button
              variant={activeIndex === pageCount ? "outline" : "ghost"}
              onClick={() => navigateToPage(pageCount)}
            >
              {pageCount}
            </Button>
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            disabled={page === pageCount}
            variant={"ghost"}
            onClick={() => navigateToPage(page + 1)}
          >
            Next
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
