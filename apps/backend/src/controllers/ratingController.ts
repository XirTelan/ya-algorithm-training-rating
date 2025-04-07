import { FastifyReply, FastifyRequest } from "fastify";
import ratingService from "../services/ratingService.js";
import { RatingResponse } from "../../types";

type GetRatingSearchParams = {
  search: string | undefined;
  page: string;
  limit: string;
};

export async function getRating(
  request: FastifyRequest<{
    Querystring: GetRatingSearchParams;
  }>,
  reply: FastifyReply
): Promise<RatingResponse> {
  const { search, page, limit } = request.query;
  if (isNaN(Number(page)) || isNaN(Number(limit))) {
    return reply.code(400).send({
      items: [],
      totalCount: 0,
    });
  }

  let res: RatingResponse;
  if (search) {
    res = await ratingService.filterByUserSearch(search);
  } else {
    res = await ratingService.buildRaiting(Number(page), Number(limit));
  }
  return reply.send(res);
}
