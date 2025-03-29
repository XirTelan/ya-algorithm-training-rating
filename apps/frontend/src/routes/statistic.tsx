import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistic")({
  component: Statistic,
});

function Statistic() {
  return <div className="p-2">Hello from Statistic!</div>;
}
