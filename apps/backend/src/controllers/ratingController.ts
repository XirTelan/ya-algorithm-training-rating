import { FastifyReply, FastifyRequest } from "fastify";
import ratingService from "../services/ratingService";

type GetRatingQuery = {
  page: string;
  limit: string;
};

export async function getRating(
  request: FastifyRequest<{
    Querystring: GetRatingQuery;
  }>,
  reply: FastifyReply
) {
  const { page, limit } = request.query;
  const res = await ratingService.buildRaiting(Number(page), Number(limit));
  reply.send(res);
}
