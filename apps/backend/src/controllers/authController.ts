import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { logger } from "../server.js";

export async function checkSession(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
    return reply.code(200).send();
  } catch (error) {
    logger.error(error, "jwt verify fail");
    return reply.code(401).send();
  }
}

export async function login(
  request: FastifyRequest,
  reply: FastifyReply,
  app: FastifyInstance
) {
  const { key } = request.body as { key: string };
  if (!key || typeof key != "string") return reply.code(400).send();

  if (key != process.env.API_KEY) return reply.code(401).send();

  const token = app.jwt.sign({ user: "admin" });
  return reply.send({ token });
}
