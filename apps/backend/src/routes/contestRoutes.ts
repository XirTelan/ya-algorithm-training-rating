import { FastifyInstance } from "fastify";
import {
  deleteContest,
  getContests,
  updateContests,
} from "../controllers/contestContoller.js";
import { contestDTOSchema } from "../schemas/contest.schema.js";

export default async function contestRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/contests",
    {
      schema: {
        tags: ["contests"],
        response: {
          200: {
            type: "array",
            items: contestDTOSchema,
          },
        },
      },
    },
    getContests
  );
  fastify.post(
    "/api/contests",
    {
      schema: {
        tags: ["contests"],
        body: {
          type: "object",
          properties: {
            contests: { type: "array", items: contestDTOSchema },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              success: { type: "boolean" },
            },
          },
          400: {
            type: "object",
            properties: {
              success: { type: "boolean", const: false },
            },
          },
        },
      },
    },
    updateContests
  );
  fastify.delete(
    "/api/contests/:id",
    {
      schema: {
        tags: ["contests"],
        params: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
    deleteContest
  );
}
