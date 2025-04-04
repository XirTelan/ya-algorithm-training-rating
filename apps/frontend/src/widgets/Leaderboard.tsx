import useGetRating from "@/features/rating/api/queries/useGetRating";
import FilterBlock from "@/features/rating/components/FilterBlock";
import PaginationBlock from "@/features/rating/components/PaginationBlock";
import RatingTable from "@/features/rating/components/RatingTable";
import { Route } from "@/routes";

import React from "react";

export default function Leaderboard() {
  const { page, limit } = Route.useSearch();

  const { data, isPending, isError } = useGetRating(page, limit);
  if (isPending || !data) return;

  const pageCount = Math.floor(data.totalCount / limit);

  return (
    <div>
      <section>
        <FilterBlock />
      </section>
      <section>
        <RatingTable data={data} />
      </section>
      <section className="my-2">
        <PaginationBlock pageCount={pageCount} />
      </section>
    </div>
  );
}
