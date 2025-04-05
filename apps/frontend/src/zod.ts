import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

export const ratingSearchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  limit: fallback(z.number(), 50).default(50),
  search: fallback(z.string(), "").default("").optional(),
});
