import { FastifyInstance } from "fastify";
import {
  deleteContest,
  getContests,
  updateContests,
} from "../controllers/contestContoller.js";
import { getRating } from "../controllers/ratingController.js";

export default async function ratingRoute(fastify: FastifyInstance) {
  fastify.get("/api/rating", getRating);
}
