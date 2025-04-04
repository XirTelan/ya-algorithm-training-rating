import getRating from "@/features/rating/api/rating";
import { useQuery } from "@tanstack/react-query";

const useGetRating = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["rating", page],
    queryFn: () => getRating(page, limit),
    staleTime: 1_000 * 60 * 10,
  });
};

export default useGetRating;
