import { FastifyReply, FastifyRequest } from "fastify";
import sessionService from "../services/sessionService.js";

export async function getSession(_req: FastifyRequest, reply: FastifyReply) {
  const res = await sessionService.getSession();
  return reply.send(res);
}

export async function updateSession(
  request: FastifyRequest<{ Body: { sessionId: string } }>,
  reply: FastifyReply
) {
  const body = request.body;
  const res = await sessionService.updateSession(body.sessionId);
  if (res.success) return reply.code(200);
  else return reply.code(520);
}
