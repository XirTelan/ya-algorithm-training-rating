export type ConfigType = {
  [key: string]: string;
};

export type ContestDTO = {
  _id?: string;
  attempts: string;
  autoUpdate: number;
  contestId: string;
  contestTitle: string;
  date?: number;
  stats: {
    attempts: number;
    success: number;
    task: string;
  }[];
  status: string;
};

export type DataEntry = {
  fine: string;
  id: string;
  tasks: string;
  tries: number;
};

export type LogDTO = {
  createdAt: string;
  message: string;
  type: string;
  updatedAt: string;
};

export type RatingAggregatedDTO = {
  _id: string;
  byContest: { [key: string]: unknown }[];
  position: number;
  totalFine: number;
  totalTasks: number;
  totalTries: number;
};

export type RatingDTO = {
  contestId: string;
  createdAt: string;
  fine: number;
  tasks: number;
  tries: number;
  updatedAt: string;
  userId: string;
};

export type RatingResponse = {
  items: RatingAggregatedDTO[];
  totalCount: number;
};

export type SessionDTO = {
  createdAt: Date;
  name: string;
  updatedAt: Date;
  value: string;
};

export type StatisticTaskAttempts = {
  totalTasks: number;
  totalTries: number;
  userCount: number;
};

export type StatisticTaskTotal = Omit<StatisticTaskAttempts, "totalTries">;
