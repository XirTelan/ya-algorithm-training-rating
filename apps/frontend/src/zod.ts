import { fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

export const productSearchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  limit: fallback(z.number(), 50).default(50),
  search: z.any().default("").optional(),
});
