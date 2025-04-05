import getRating from "@/features/rating/api/rating";
import { RatingSearch, StatisticContest, StatisticSummary } from "@/types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useGetStatisticContest = () => {
  return useSuspenseQuery({
    queryKey: ["statistic/contest"],
    queryFn: () => getStatisticContest(),
    staleTime: 1_000 * 60 * 10,
  });
};

export const useGetStatisticSummary = () => {
  return useSuspenseQuery({
    queryKey: ["statistic/summary"],
    queryFn: () => getStatisticSummary(),
    staleTime: 1_000 * 60 * 10,
  });
};

async function getStatisticContest(): Promise<StatisticContest> {
  const data = await fetch(`${BACKEND_URL}/api/statistic/contest`);
  return await data.json();
}

async function getStatisticSummary(): Promise<StatisticSummary> {
  const data = await fetch(`${BACKEND_URL}/api/statistic/summary`);
  return await data.json();
}
