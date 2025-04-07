export type ContestDTO = {
  _id?: string;
  contestTitle: string;
  contestId: string;
  autoUpdate: number;
  attempts: string;
  date?: number;
  stats?: {
    task: string;
    success: number;
    attempts: number;
  }[];
  status: string;
};

export type SessionDTO = {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  value: string;
};

export type LogType = "all" | "info" | "error" | "warning";

export type Filter = {
  type: LogType;
  time: string;
};

export type LogEntry = {
  _id: string;
  message: string;
  type: Exclude<LogType, "all">;
  createdAt: Date;
};
