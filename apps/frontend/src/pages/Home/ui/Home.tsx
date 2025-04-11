import FilterBlock from "@/features/rating/ui/FilterBlock";
import { Leaderboard } from "@/widgets/leaderboard/ui/Leaderboard";
import { Suspense } from "react";
import { SkeletonTable } from "./SkeletonTable";

export function Home() {
  return (
    <>
      <section>
        <FilterBlock />
      </section>
      <Suspense fallback={<SkeletonTable />}>
        <Leaderboard />
      </Suspense>
    </>
  );
}
