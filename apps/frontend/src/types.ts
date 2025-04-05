import { z } from "zod";
import { ratingSearchSchema } from "./zod";

export type RatingSearch = z.infer<typeof ratingSearchSchema>;

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

export type ContestDTO = {
  _id?: string;
  contestTitle: string;
  contestId: string;
  autoUpdate: number;
  attempts: string;
  date?: number;
  stats: {
    task: string;
    success: number;
    attempts: number;
  }[];
  status: string;
};

export type StatisticContest = {};

export type StatisticSummary = {
  totalTasks: number;
  totalTries: number;
  userCount: number;
}[];
