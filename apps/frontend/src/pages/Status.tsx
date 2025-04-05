import UpdatesInfo from "@/widgets/UpdatesInfo";
import React, { Suspense } from "react";

export default function Status() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <UpdatesInfo />
    </Suspense>
  );
}
