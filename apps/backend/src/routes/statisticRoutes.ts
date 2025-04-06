import { FastifyInstance } from "fastify";
import {
  getStatTaskTotal,
  getStatTaskWithAttempts,
} from "../controllers/statisticController";

export default async function statisticRoutes(fastify: FastifyInstance) {
  fastify.get("/api/statistic/withattempts", getStatTaskWithAttempts);
  fastify.get("/api/statistic/tasttotal", getStatTaskTotal);
}
