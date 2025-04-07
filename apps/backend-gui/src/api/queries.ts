import { useSuspenseQuery } from "@tanstack/react-query";
import { getContests } from "./contests";
import { getSession } from "./session";
import { getLogs } from "./logs";
import { LogType } from "@/types";

export function useGetContests() {
  return useSuspenseQuery({
    queryKey: ["contests"],
    queryFn: getContests,
  });
}

export function useGetSession() {
  return useSuspenseQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
}

export function useGetLogs(searchProps: { time: string; type: LogType }) {
  return useSuspenseQuery({
    queryKey: ["logs", searchProps],
    queryFn: () => getLogs(searchProps.type, searchProps.time),
    refetchInterval: 60_000,
  });
}
