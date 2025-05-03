import axiosInstance from "@/lib/axios";
import { LogEntry, LogType } from "@/types";

export async function getLogs(
  type: LogType,
  time: string
): Promise<LogEntry[]> {
  try {
    const res = await axiosInstance.get(`/api/logs`, {
      params: { type, time },
    });

    return res.data?.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
