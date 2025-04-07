import { FastifyInstance } from "fastify";
import {
  getStatTaskTotal,
  getStatTaskWithAttempts,
} from "../controllers/statisticController.js";
import statisticSchema from "../schemas/statistic.schema.js";

export default async function statisticRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/statistic/withattempts",
    {
      schema: statisticSchema.withAttempts,
    },
    getStatTaskWithAttempts
  );
  fastify.get(
    "/api/statistic/tasktotal",
    {
      schema: statisticSchema.taskTotal,
    },
    getStatTaskTotal
  );
}
