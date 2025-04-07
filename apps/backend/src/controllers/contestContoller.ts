import { FastifyReply, FastifyRequest } from "fastify";
import contestService from "../services/contestService.js";
import { ContestDTO } from "../../types";
import { logger } from "../server.js";

export async function getContests(_req: FastifyRequest, reply: FastifyReply) {
  try {
    const res = await contestService.getContests();
    return reply.code(200).send(res);
  } catch (error) {
    logger.error(error, "contestContoller/getContest");
    return reply.code(500).send([]);
  }
}

export async function updateContests(
  request: FastifyRequest<{ Body: { contests: ContestDTO[] } }>,
  reply: FastifyReply
) {
  const body = request.body;
  if (!body || !("contests" in body)) {
    return reply.code(400).send();
  }
  const res = await contestService.updateContests(body.contests);
  if (res.success) return reply.status(200);
  else return reply.code(520).send();
}

export async function deleteContest(
  request: FastifyRequest<{
    Params: { id: string };
    Body: { contests: ContestDTO[] };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  if (!id) {
    return reply.code(400).send();
  }

  await contestService.deleteContest(id);
  return reply.code(200).send();
}
