import getRating from "@/api/rating";
import { useQuery } from "@tanstack/react-query";

const useGetRating = (page: number) => {
  return useQuery({
    queryKey: ["rating", page],
    queryFn: () => getRating(page),
  });
};

export default useGetRating;
