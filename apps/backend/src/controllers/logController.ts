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
    reply.send({
      success: true,
      data: res.data,
    });
  } else {
    reply.code(400);
  }
}
