import { z } from "zod";
import { productSearchSchema } from "./zod";

export type ProductSearch = z.infer<typeof productSearchSchema>;

export type ContestData = {
  _id: string;
  position: number;
  totalTasks: number;
  totalFine: number;
  totalTries: number;
  byContest: { [key: string]: unknown }[];
};

export type RatingDTO = {
  items: ContestData[];
  totalCount: number;
};
