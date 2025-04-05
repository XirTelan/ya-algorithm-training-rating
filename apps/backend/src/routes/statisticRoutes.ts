import { FastifyInstance } from "fastify";
import {
  getSummaryByTaskAndAttempts,
  getTaskCountByContest,
} from "../controllers/statisticController";

export default async function statisticRoutes(fastify: FastifyInstance) {
  fastify.get("/api/statistic/contest", getTaskCountByContest);
  fastify.get("/api/statistic/summary", getSummaryByTaskAndAttempts);
}
