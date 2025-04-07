import { FastifyReply, FastifyRequest } from "fastify";
import logService from "../services/logService.js";

export async function getLogs(
  request: FastifyRequest<{
    Querystring: { time: string; type: string };
    Body: { name: string; value: string };
  }>,
  reply: FastifyReply
) {
  const { time, type } = request.query;
  const res = await logService.getLogs(time, type);
  if (res?.success) {
    return reply.send(res);
  } else {
    return reply.code(400).send({
      success: false,
      data: [],
    });
  }
}
