import useGetRating from "@/features/rating/api/queries/useGetRating";
import FilterBlock from "@/features/rating/components/FilterBlock";
import PaginationBlock from "@/features/rating/components/PaginationBlock";
import RatingTable from "@/features/rating/components/RatingTable";
import { Route } from "@/routes";

import React from "react";

export default function Leaderboard() {
  const searchProps = Route.useSearch();

  const { data } = useGetRating(searchProps);

  const pageCount = Math.ceil(data.totalCount / searchProps.limit);

  return (
    <>
      <section>
        <RatingTable data={data} />
      </section>
      <section className="my-2">
        <PaginationBlock pageCount={pageCount} />
      </section>
    </>
  );
}
