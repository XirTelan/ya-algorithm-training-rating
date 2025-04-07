import { FastifyInstance } from "fastify";

import { getRating } from "../controllers/ratingController.js";
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
}
