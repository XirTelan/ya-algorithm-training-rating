import { ContestDTO } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useGetContests = () => {
  return useSuspenseQuery({
    queryKey: ["contests"],
    queryFn: () => getContest(),
    staleTime: 1_000 * 60 * 10,
  });
};

export default useGetContests;

async function getContest(): Promise<ContestDTO[]> {
  const data = await fetch(`${BACKEND_URL}/api/contests`);
  return await data.json();
}
