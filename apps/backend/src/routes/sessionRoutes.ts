import { FastifyInstance } from "fastify";
import { getSession, updateSession } from "../controllers/sessionContoller.js";


export default async function sessionRotes(fastify: FastifyInstance) {
  fastify.get("/api/session", getSession);
  fastify.post("/api/session", updateSession);
}
