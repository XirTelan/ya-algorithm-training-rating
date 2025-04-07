import { StatisticTaskAttempts, StatisticTaskTotal } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetStatisticTasks = () => {
  return useSuspenseQuery({
    queryKey: ["statistic", "withattempts"],
    queryFn: () => getStatTaskWithAttempts(),
    staleTime: 1_000 * 60 * 10,
  });
};

export const useGetStatisticTaskTotal = () => {
  return useSuspenseQuery({
    queryKey: ["statistic", "tasttotal"],
    queryFn: () => getStatTaskTotal(),
    staleTime: 1_000 * 60 * 10,
  });
};

async function getStatTaskWithAttempts(): Promise<StatisticTaskAttempts[]> {
  const data = await fetch(`/api/statistic/withattempts`);
  return await data.json();
}

async function getStatTaskTotal(): Promise<StatisticTaskTotal[]> {
  const data = await fetch(`/api/statistic/tasttotal`);
  return await data.json();
}
