import { z } from "zod";

export const productSearchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(50),
  filter: z.string().default(""),
  order: z.enum(["ascending", "descending"]).default("descending"),
  sort: z.enum(["tries", "fio"]).default("fio"),
});
