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

export type RatingDTO = {
  userId: string;
  contestId: string;
  tasks: number;
  fine: number;
  tries: number;
  createdAt: string;
  updatedAt: string;
};

export type ConfigType = {
  [key: string]: string;
};

export type DataEntry = {
  id: string;
  tasks: string;
  fine: string;
  tries: number;
};

export type ContestData = {
  _id: string;
  position: number;
  totalTasks: number;
  totalFine: number;
  totalTries: number;
  byContest: { [key: string]: unknown }[];
};

export type LogDTO = {
  message: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type StatisticTaskAttempts = {
  totalTasks: number;
  totalTries: number;
  userCount: number;
};

export type StatisticTaskTotal = Omit<StatisticTaskAttempts, "totalTries">;
