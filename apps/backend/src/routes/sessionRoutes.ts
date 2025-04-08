import { FastifyInstance } from "fastify";
import { getSession, updateSession } from "../controllers/sessionContoller.js";
import sessionSchema from "../schemas/session.schema.js";

export default async function sessionRotes(fastify: FastifyInstance) {
  fastify.get(
    "/api/session",
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: sessionSchema.getSchema,
    },
    getSession
  );
  fastify.post(
    "/api/session",
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: sessionSchema.postSchema,
    },
    updateSession
  );
}
