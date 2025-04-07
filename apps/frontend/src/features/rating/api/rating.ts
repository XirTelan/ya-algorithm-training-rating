import {  RatingDTO, RatingSearch } from "@/types";


async function getRating(searchProps: RatingSearch): Promise<RatingDTO> {
  const params = new URLSearchParams({
    page: String(searchProps.page),
    limit: String(searchProps.limit),
    search: searchProps.search ?? "",
  });
  const data = await fetch(`/api/rating?${params}`);
  return await data.json();
}

export default getRating;
