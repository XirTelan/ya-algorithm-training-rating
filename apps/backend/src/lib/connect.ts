import {
  FastifyInstance,
  RawServerDefault,
  FastifyBaseLogger,
  FastifyTypeProvider,
} from "fastify";
import { IncomingMessage, ServerResponse } from "http";
import mongoose from "mongoose";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      MONGO_INITDB_ROOT_USERNAME: string;
      MONGO_INITDB_ROOT_PASSWORD: string;
      MONGO_INITDB_DATABASE: string;
    };
  }
}

export default async function (
  fastify: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProvider
  >
) {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGO_INITDB_DATABASE,
  } = fastify.config;

  const MONGODB_URI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${MONGO_INITDB_DATABASE}`;
  fastify.log.info(MONGODB_URI);
  if (!MONGODB_URI) throw new Error("MongoDB URI not found");

  try {
    await mongoose.connect(MONGODB_URI);

    fastify.log.info("Connected to MongoDB");
  } catch (error) {
    fastify.log.error("MongoDB Connection Error:", error);
    throw new Error("MongoDB Connection Error");
  }

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    fastify.log.info(
      "MongoDB connection closed due to application termination"
    );
    throw new Error("MongoDB connection closed due to application termination");
  });
}
