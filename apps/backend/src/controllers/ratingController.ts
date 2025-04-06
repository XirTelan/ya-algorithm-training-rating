import { FastifyReply, FastifyRequest } from "fastify";
import ratingService from "../services/ratingService";
import { logger } from "../server";

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
) {
  const { search, page, limit } = request.query;
  if (isNaN(Number(page)) || isNaN(Number(limit))) {
    return reply.code(400).send();
  }

  let res;
  if (search) {
    res = await ratingService.filterByUserSearch(search);
  } else {
    res = await ratingService.buildRaiting(Number(page), Number(limit));
  }
  reply.send(res);
}
