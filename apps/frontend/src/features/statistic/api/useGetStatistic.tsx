import getRating from "@/features/rating/api/rating";
import { StatisticTaskAttempts, StatisticTaskTotal } from "@/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
  const data = await fetch(`${BACKEND_URL}/api/statistic/withattempts`);
  return await data.json();
}

async function getStatTaskTotal(): Promise<StatisticTaskTotal[]> {
  const data = await fetch(`${BACKEND_URL}/api/statistic/tasttotal`);
  return await data.json();
}
