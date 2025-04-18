import { Button } from "@repo/ui/button";
import { PaginationItem } from "@repo/ui/pagination";
import React from "react";

type PaginationPageProps = {
  pageNum: number;
  currentPage: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  itemProps?: Partial<React.ComponentProps<"li">>;
};

export default function PaginationPage({
  pageNum,
  currentPage,
  onClick,
  itemProps,
}: PaginationPageProps) {
  return (
    <PaginationItem {...itemProps}>
      <Button
        aria-current={pageNum === currentPage ? "page" : undefined}
        data-page={pageNum}
        variant={pageNum === currentPage ? "outline" : "ghost"}
        className="w-10 h-10"
        onClick={onClick}
      >
        {pageNum}
      </Button>
    </PaginationItem>
  );
}
