import FilterBlock from "@/features/rating/components/FilterBlock";
import RatingTable from "@/features/rating/components/RatingTable";
import Leaderboard from "@/widgets/Leaderboard";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="p-2  ">
      <h1>Лидербоард</h1>
      <Suspense fallback={<div>Loading</div>}>
        <Leaderboard />
      </Suspense>
    </div>
  );
}
