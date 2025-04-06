import { FastifyRequest, FastifyReply } from "fastify";
import statisticService from "../services/statisticService";

export async function getStatTaskWithAttempts(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statistics = await statisticService.getStatTaskWithAttempts();
  return reply.send(statistics);
}

export async function getStatTaskTotal(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statistics = await statisticService.getStatTaskTotal();
  return reply.send(statistics);
}
