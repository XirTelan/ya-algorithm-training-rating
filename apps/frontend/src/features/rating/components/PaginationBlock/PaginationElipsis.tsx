import { Button } from "@repo/ui/button";
import { PaginationItem } from "@repo/ui/pagination";
import { MoreHorizontalIcon } from "lucide-react";

type PaginationEllipsisProps = {
  pageNum: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function PaginationEllipsis({
  pageNum,
  onClick,
}: PaginationEllipsisProps) {
  return (
    <PaginationItem
      className="hidden sm:block"
      aria-label={`Jump to page ${pageNum}`}
    >
      <Button data-page={pageNum} variant={"ghost"} onClick={onClick}>
        <MoreHorizontalIcon className="size-4" />
      </Button>
    </PaginationItem>
  );
}
