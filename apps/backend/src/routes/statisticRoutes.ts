import { FastifyInstance } from "fastify";
import {
  getStatTaskTotal,
  getStatTaskWithAttempts,
} from "../controllers/statisticController.js";

export default async function statisticRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/statistic/withattempts",
    {
      schema: {
        tags: ["statistic"],

        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                totalTasks: { type: "integer" },
                totalTries: { type: "integer" },
                userCount: { type: "integer" },
              },
            },
          },
        },
      },
    },
    getStatTaskWithAttempts
  );
  fastify.get(
    "/api/statistic/tasttotal",
    {
      schema: {
        tags: ["statistic"],

        response: {
          200: {
            description: "Successful response",
            type: "array",
            items: {
              type: "object",
              properties: {
                totalTasks: { type: "integer" },
                userCount: { type: "integer" },
              },
            },
          },
        },
      },
    },
    getStatTaskTotal
  );
}
