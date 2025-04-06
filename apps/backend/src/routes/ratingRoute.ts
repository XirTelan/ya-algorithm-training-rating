import { FastifyInstance } from "fastify";

import { getRating } from "../controllers/ratingController.js";

export default async function ratingRoute(fastify: FastifyInstance) {
  fastify.get(
    "/api/rating",
    {
      schema: {
        tags: ["rating"],
      },
    },
    getRating
  );
}
