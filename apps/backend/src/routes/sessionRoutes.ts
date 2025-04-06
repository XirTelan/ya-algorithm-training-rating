import { FastifyInstance } from "fastify";
import { getSession, updateSession } from "../controllers/sessionContoller.js";

export default async function sessionRotes(fastify: FastifyInstance) {
  fastify.get(
    "/api/session",
    {
      schema: {
        tags: ["session"],
      },
    },
    getSession
  );
  fastify.post(
    "/api/session",
    {
      schema: {
        tags: ["session"],
      },
    },
    updateSession
  );
}
