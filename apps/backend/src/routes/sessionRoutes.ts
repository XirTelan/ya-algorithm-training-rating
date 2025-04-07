import { FastifyInstance } from "fastify";
import { getSession, updateSession } from "../controllers/sessionContoller.js";
import sessionSchema from "../schemas/session.schema.js";

export default async function sessionRotes(fastify: FastifyInstance) {
  fastify.get(
    "/api/session",
    {
      schema: sessionSchema.getSchema,
    },
    getSession
  );
  fastify.post(
    "/api/session",
    {
      schema: sessionSchema.postSchema,
    },
    updateSession
  );
}
