import { FastifyInstance } from "fastify";
import { getSession, updateSession } from "../controllers/sessionContoller.js";


export default async function sessionRotes(fastify: FastifyInstance) {
  fastify.get("/session", getSession);
  fastify.post("/session", updateSession);
}
