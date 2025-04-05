import { FastifyReply, FastifyRequest } from "fastify";
import contestService from "../services/contestService.js";
import { ContestDTO } from "../../types";
import { logger } from "../server.js";

export async function getContests(_req: FastifyRequest, reply: FastifyReply) {
  try {
    const res = await contestService.getContests();
    reply.code(200).send(res);
  } catch (error) {
    logger.error(error, "contestContoller/getContest");
    reply.code(500).send([]);
  }
}

export async function updateContests(
  request: FastifyRequest<{ Body: { contests: ContestDTO[] } }>,
  reply: FastifyReply
) {
  const body = request.body;
  if (!("contests" in body)) reply.status(400);
  const res = await contestService.updateContests(body.contests);
  if (res.success) reply.status(200);
  else reply.status(520);
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
    reply.status(400);
    return;
  }

  const res = await contestService.deleteContest(id);
  reply.status(200);
}
