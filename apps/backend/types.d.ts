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
  userId: String;
  contestId: String;
  tasks: Number;
  fine: Number;
  tries: Number;
  createdAt: Date;
  updatedAt: Date;
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
