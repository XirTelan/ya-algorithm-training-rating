import { FastifyReply, FastifyRequest } from "fastify";
import ratingService from "../services/ratingService";
import { logger } from "../server";

type GetRatingQuery = {
  search: string | undefined;
  page: string;
  limit: string;
};

export async function getRating(
  request: FastifyRequest<{
    Querystring: GetRatingQuery;
  }>,
  reply: FastifyReply
) {
  const { search, page, limit } = request.query;
  let res;
  if (search) {
    res = await ratingService.filterByUserSearch(search);
  } else {
    res = await ratingService.buildRaiting(Number(page), Number(limit));
  }
  reply.send(res);
}
