import { FastifyJWTOptions, Secret } from "@fastify/jwt";

const config = (): FastifyJWTOptions => ({
  secret: process.env.SECRET as Secret,
});

export default config;
