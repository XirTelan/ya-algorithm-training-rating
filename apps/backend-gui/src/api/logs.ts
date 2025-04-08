import axiosInstance from "@/lib/axios";
import { LogEntry, LogType } from "@/types";

export async function getLogs(
  type: LogType,
  time: string
): Promise<LogEntry[]> {
  try {
    const res = await axiosInstance(`/api/logs?type=${type}&time=${time}`);
    if (res.status === 200 && res.data.status) {
      return res.data.data ?? [];
    } else return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

