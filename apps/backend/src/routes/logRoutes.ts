import { FastifyInstance } from "fastify";

import { getLogs } from "../controllers/logController.js";
import logsSchema from "../schemas/logs.schema.js";

export default async function logRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/logs",
    {
      schema: logsSchema.getSchema,
    },
    getLogs
  );
}
