import {
  SummaryByContest,
  SummaryByTaskAttemptts,
  SkeletonBlock,
  SummaryByTasks,
} from "@/features/statistic";
import { Separator } from "@repo/ui/separator";
import React, { Suspense } from "react";

export function Stats() {
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
