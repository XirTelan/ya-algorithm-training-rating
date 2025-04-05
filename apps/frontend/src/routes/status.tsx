import Status from "@/pages/Status";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/status")({
  component: Status,
});
