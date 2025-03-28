import { FastifyInstance } from "fastify";

import { getLogs } from "../controllers/logController";

export default async function logRoutes(fastify: FastifyInstance) {
  fastify.get("/logs", getLogs);
}
