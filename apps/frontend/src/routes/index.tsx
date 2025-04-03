import { createFileRoute } from "@tanstack/react-router";
import RatingTable from "@/features/rating/components/RatingTable";
import FilterBlock from "@/features/rating/components/FilterBlock";
import { productSearchSchema } from "@/zod";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: productSearchSchema,
});

function Index() {
  return (
    <div className="p-2 ">
      <h1>Лидербоард</h1>
      <FilterBlock />
      <RatingTable />
    </div>
  );
}
