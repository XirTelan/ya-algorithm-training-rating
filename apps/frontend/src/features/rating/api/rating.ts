import { ContestData, RatingDTO } from "@/types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function getRating(page: number, limit: number = 50): Promise<RatingDTO> {
  console.log("wtf", BACKEND_URL);
  const data = await fetch(
    `${BACKEND_URL}/api/rating?page=${page}&limit=${limit}`
  );
  return await data.json();
}

export default getRating;
