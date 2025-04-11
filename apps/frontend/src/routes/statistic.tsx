import { Stats } from "@/pages/Stats/";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistic")({
  component: Stats,
});
