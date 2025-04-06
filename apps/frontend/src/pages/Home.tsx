import FilterBlock from "@/features/rating/components/FilterBlock";
import RatingTable from "@/features/rating/components/RatingTable";
import Leaderboard from "@/widgets/Leaderboard";
import UpdatesInfo from "@/widgets/UpdatesInfo";
import { Skeleton } from "@repo/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="p-2  ">
      <section>
        <FilterBlock />
      </section>
      <Suspense fallback={<SkeletonTable />}>
        <Leaderboard />
      </Suspense>
    </div>
  );
}

const SkeletonTable = () => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex w-full">
      <div className="flex w-full gap-4 ">
        <Skeleton className="h-6 w-10 flex" />
        <Skeleton className="h-6 min-w-40 flex grow" />
        <Skeleton className="h-6 w-20 flex" />
        <Skeleton className="h-6 w-20 flex" />
        <Skeleton className="h-6 w-20 flex" />
        <Skeleton className="h-6 w-20 flex" />
        <Skeleton className="h-6 w-20 flex" />
      </div>
    </div>
    <div className="flex flex-col w-full gap-2 ">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className="h-6 w-full flex" />
      ))}
    </div>
  </div>
);
