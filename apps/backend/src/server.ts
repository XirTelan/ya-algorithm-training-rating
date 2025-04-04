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

import loggerConfig from "./plugins/loggerConfig.js";

const DEFAULT_PORT = 3000;
dotenv.config();

const fastify = Fastify({
  exposeHeadRoutes: true,
  logger: loggerConfig,
});
export const logger = fastify.log;

await fastify.register(swagger, swaggerConfig);
await fastify.register(swaggerUi, swaggerUiConfig);

await fastify.register(fastifyEnv, fastifyEnvConfig);

connectDB(fastify);

fastify.register(cors);

fastify.register(contestRoutes);
fastify.register(sessionRotes);
fastify.register(logRoutes);

fastify.register(contestsCheck);

fastify.listen(
  { port: Number(process.env.SERVER_PORT) ?? DEFAULT_PORT },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
);

await fastify.ready();
