import { FastifyInstance } from "fastify";

import { deleteAll, getRating } from "../controllers/ratingController.js";
import ratingSchema from "../schemas/rating.schema.js";

export default async function ratingRoute(fastify: FastifyInstance) {
  fastify.get(
    "/api/rating",
    {
      schema: {
        tags: ["rating"],
        response: {
          200: ratingSchema.ratingResponseSchema,
        },
      },
    },
    getRating
  );
  fastify.delete(
    "/api/rating",
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: {
        tags: ["rating"],
      },
    },
    deleteAll
  );
}
