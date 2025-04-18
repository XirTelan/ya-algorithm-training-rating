import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";

import connectDB from "./lib/connect.js";
import fastifyEnv from "@fastify/env";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import contestRoutes from "./routes/contestRoutes.js";
import sessionRotes from "./routes/sessionRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import contestsCheck from "./tasks/contestsCheck.js";
import swaggerConfig, { swaggerUiConfig } from "./plugins/swaggerConfig.js";
import fastifyEnvConfig from "./plugins/fastifyEnvConfig.js";
import ratingRoute from "./routes/ratingRoute.js";
import loggerConfig from "./plugins/loggerConfig.js";
import statisticRoutes from "./routes/statisticRoutes.js";
import fastifyAuth from "@fastify/auth";
import fastifyJwt from "@fastify/jwt";
import fastifyJwtConfig from "./plugins/fastifyJwtConfig.js";
import authRoutes from "./routes/authRoutes.js";

const DEFAULT_PORT = 3000;
dotenv.config();

const fastify = Fastify({
  exposeHeadRoutes: true,
  ignoreTrailingSlash: true,
  logger: loggerConfig,
});

export const logger = fastify.log;

fastify.register(swagger, swaggerConfig);
fastify.register(swaggerUi, swaggerUiConfig);

await fastify.register(fastifyEnv, fastifyEnvConfig);

await connectDB(fastify);

fastify.register(cors);

fastify.register(fastifyJwt, fastifyJwtConfig);

fastify
  .decorate("verifyJWT", async (request) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      logger.error(error, "jwt verify fail");
      throw Error("jwt verify fail");
    }
  })
  .register(fastifyAuth);

fastify.register(contestRoutes);
fastify.register(sessionRotes);
fastify.register(logRoutes);
fastify.register(ratingRoute);
fastify.register(statisticRoutes);
fastify.register(authRoutes);

fastify.register(contestsCheck);

fastify.listen(
  {
    port: process.env.SERVER_PORT
      ? Number(process.env.SERVER_PORT)
      : DEFAULT_PORT,
    host: process.env.SERVER_HOST,
  },
  function (err) {
    if (err) {
      fastify.log.error(err);
      throw Error("error");
    }
  }
);

await fastify.ready();
