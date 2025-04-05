import FilterBlock from "@/features/rating/components/FilterBlock";
import RatingTable from "@/features/rating/components/RatingTable";
import Leaderboard from "@/widgets/Leaderboard";
import UpdatesInfo from "@/widgets/UpdatesInfo";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="p-2  ">
      <section>
        <FilterBlock />
      </section>
      <Suspense fallback={<div>Loading</div>}>
        <Leaderboard />
      </Suspense>
    </div>
  );
}
