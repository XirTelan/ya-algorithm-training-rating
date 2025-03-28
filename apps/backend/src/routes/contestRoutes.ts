import { FastifyInstance } from "fastify";
import {
  deleteContest,
  getContests,
  updateContests,
} from "../controllers/contestContoller.js";

export default async function contestRoutes(fastify: FastifyInstance) {
  fastify.get("/contests", getContests);
  fastify.post("/contests", updateContests);
  fastify.delete("/contests/:id", deleteContest);
}
