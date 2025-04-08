import { FastifyInstance } from "fastify";
import {
  deleteContest,
  getContests,
  updateContests,
} from "../controllers/contestContoller.js";
import contestsSchema from "../schemas/contests.schema.js";

export default async function contestRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/contests",
    {
      schema: contestsSchema.getSchema,
    },
    getContests
  );
  fastify.post(
    "/api/contests",
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: contestsSchema.postSchema,
    },
    updateContests
  );
  fastify.delete(
    "/api/contests/:id",
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: contestsSchema.deleteSchema,
    },
    deleteContest
  );
}
