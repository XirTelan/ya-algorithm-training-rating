import UpdatesInfo from "@/widgets/UpdatesInfo";
import { Skeleton } from "@repo/ui/skeleton";
import React, { Suspense } from "react";

export default function Status() {
  return (
    <>
      <Suspense fallback={<SkeletonTable />}>
        <UpdatesInfo />
      </Suspense>
    </>
  );
}

const SkeletonTable = () => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex w-full">
      <div className="flex w-full gap-4 justify-center ">
        <Skeleton className="h-8 w-20 flex" />
        <Skeleton className="h-8 w-1/4 flex" />
        <Skeleton className="h-8 w-1/4 flex" />
        <Skeleton className="h-8 w-1/4 flex" />
      </div>
    </div>
    <div className="flex flex-col w-full gap-2 ">
      <Skeleton className="h-8 w-full flex" />
      <Skeleton className="h-8 w-full flex" />
      <Skeleton className="h-8 w-full flex" />
    </div>
  </div>
);
