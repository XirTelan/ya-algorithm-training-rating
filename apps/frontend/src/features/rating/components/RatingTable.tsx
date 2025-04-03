import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { Button } from "@repo/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

import PaginationBlock from "./PaginationBlock";
import { Route } from "@/routes";
import useGetRating from "../api/queries/useGetRating";

const RatingTable = () => {
  const { page } = Route.useSearch();

  const { data, isPending, isError } = useGetRating(page);

  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search);

  return (
    <section>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Table className=" relative -z-1">
        <TableCaption className=" caption-top">Rating</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>2</TableHead>
            <TableHead>3</TableHead>
            <TableHead>1</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            1, 2, 3, 4, 5, 6,

            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
          ].map((item, i) => (
            <TableRow key={i}>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <PaginationBlock totalCount={1500} />
    </section>
  );
};

export default RatingTable;
