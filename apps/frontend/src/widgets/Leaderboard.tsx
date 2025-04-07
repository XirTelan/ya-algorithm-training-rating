import useGetRating from "@/features/rating/api/queries/useGetRating";
import PaginationBlock from "@/features/rating/components/PaginationBlock/PaginationBlock";
import RatingTable from "@/features/rating/components/RatingTable";
import { Route } from "@/routes";


import React, { Suspense } from "react";

export default function Leaderboard() {
  const searchProps = Route.useSearch();

  const { data } = useGetRating(searchProps);

  const pageCount = Math.ceil(data.totalCount / searchProps.limit);

  return (
    <>
      <section>
        <Suspense>
          <RatingTable data={data} />
        </Suspense>
      </section>
      <section className="my-2">
        <PaginationBlock pageCount={pageCount} />
      </section>
    </>
  );
}
