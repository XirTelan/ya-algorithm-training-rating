import SummaryByContest from "@/features/statistic/components/SummaryByContest";
import SummaryByTaskAttemptts from "@/features/statistic/components/SummaryByTaskAttemptts";
import SummaryByTasks from "@/features/statistic/components/SummaryByTasks";
import SkeletonBlock from "@/features/statistic/ui/SkeletonBlock";
import { Separator } from "@repo/ui/separator";
import React, { Suspense } from "react";

export default function Stats() {
  return (
    <>
      <Suspense fallback={<SkeletonBlock />}>
        <SummaryByTasks />
      </Suspense>
      <Separator className="my-4" />
      <Suspense fallback={<SkeletonBlock />}>
        <SummaryByTaskAttemptts />
      </Suspense>
      <Separator className="my-4" />
      <Suspense fallback={<SkeletonBlock />}>
        <SummaryByContest />
      </Suspense>
    </>
  );
}
