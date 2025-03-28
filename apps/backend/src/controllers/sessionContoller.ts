import { FastifyReply, FastifyRequest } from "fastify";
import sessionService from "../services/sessionService.js";

export async function getSession(_req: FastifyRequest, reply: FastifyReply) {
  const res = await sessionService.getSession();
  reply.send(res);
}

export async function updateSession(
  request: FastifyRequest<{ Body: { name: string; value: string } }>,
  reply: FastifyReply
) {
  const body = request.body;
  const res = await sessionService.updateSession(body.value);
  if (res.success) reply.code(200);
  else reply.code(520);
}
