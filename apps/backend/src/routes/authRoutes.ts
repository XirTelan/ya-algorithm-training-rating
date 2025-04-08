import { FastifyInstance } from "fastify";
import { checkSession, login } from "../controllers/authController.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/api/auth/session", checkSession);
  fastify.post("/api/auth/login", (req, reply) => login(req, reply, fastify));
}
