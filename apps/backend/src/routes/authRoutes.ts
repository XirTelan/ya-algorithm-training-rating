import { FastifyInstance } from "fastify";
import { checkSession, login } from "../controllers/authController.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/auth/session",
    {
      schema: {
        tags: ["auth"],
      },
    },
    checkSession
  );
  fastify.post(
    "/api/auth/login",
    {
      schema: {
        tags: ["auth"],
      },
    },
    (req, reply) => login(req, reply, fastify)
  );
}
