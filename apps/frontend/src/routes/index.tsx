import { createFileRoute } from "@tanstack/react-router";
import RatingTable from "@/features/rating/components/RatingTable";
import FilterBlock from "@/features/rating/components/FilterBlock";
import { productSearchSchema } from "@/zod";
import { zodValidator } from "@tanstack/zod-adapter";

import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: zodValidator(productSearchSchema),
});
