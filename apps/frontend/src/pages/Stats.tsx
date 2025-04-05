import Statistic from "@/widgets/Statistic";
import React, { Suspense } from "react";

export default function Stats() {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Statistic />
      </Suspense>
    </div>
  );
}
