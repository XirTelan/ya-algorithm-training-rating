import {  RatingDTO, RatingSearch } from "@/types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function getRating(searchProps: RatingSearch): Promise<RatingDTO> {
  const params = new URLSearchParams({
    page: String(searchProps.page),
    limit: String(searchProps.limit),
    search: searchProps.search ?? "",
  });
  const data = await fetch(`${BACKEND_URL}/api/rating?${params}`);
  return await data.json();
}

export default getRating;
