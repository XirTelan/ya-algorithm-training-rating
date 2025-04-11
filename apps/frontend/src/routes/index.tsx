import { createFileRoute } from "@tanstack/react-router";
import { ratingSearchSchema } from "@/zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { Home } from "@/pages/Home";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: zodValidator(ratingSearchSchema),
});
