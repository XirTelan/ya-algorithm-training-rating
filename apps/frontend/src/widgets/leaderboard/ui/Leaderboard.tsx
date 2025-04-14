import { PaginationBlock, RatingTable, useGetRating } from "@/features/rating";
import { Route } from "@/routes";

import React, { Suspense } from "react";

export function Leaderboard() {
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
