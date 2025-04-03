import { z } from "zod";
import { productSearchSchema } from "./zod";

export type ProductSearch = z.infer<typeof productSearchSchema>;
