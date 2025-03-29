import { createFileRoute } from "@tanstack/react-router";
import RatingTable from "@/features/statistic/components/RatingTable";
import FilterBlock from "@/features/rating/components/FilterBlock";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <FilterBlock />
      <RatingTable />
    </div>
  );
}
