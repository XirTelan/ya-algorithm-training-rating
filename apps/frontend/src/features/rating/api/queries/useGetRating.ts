import getRating from "@/features/rating/api/rating";
import { RatingSearch } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";

const useGetRating = (searchProps: RatingSearch) => {
  return useSuspenseQuery({
    queryKey: ["rating", searchProps],
    queryFn: () => getRating(searchProps),
    staleTime: 1_000 * 60 * 10,
  });
};

export default useGetRating;
