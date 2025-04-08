import { FastifyInstance } from "fastify";

import { getLogs } from "../controllers/logController.js";
import logsSchema from "../schemas/logs.schema.js";

export default async function logRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/logs",
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: logsSchema.getSchema,
    },
    getLogs
  );
}
