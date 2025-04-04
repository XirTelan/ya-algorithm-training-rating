import { FastifyInstance } from "fastify";
import {
  deleteContest,
  getContests,
  updateContests,
} from "../controllers/contestContoller.js";

export default async function contestRoutes(fastify: FastifyInstance) {
  fastify.get("/api/contests", getContests);
  fastify.post("/api/contests", updateContests);
  fastify.delete("/api/contests/:id", deleteContest);
}
