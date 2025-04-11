import { UpdatesInfo } from "@/widgets/updatesInfo";
import { Suspense } from "react";
import { SkeletonTable } from "./SkeletonTable";

export function Status() {
  return (
    <>
      <Suspense fallback={<SkeletonTable />}>
        <UpdatesInfo />
      </Suspense>
    </>
  );
}
