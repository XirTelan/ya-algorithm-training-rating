const schema = {
  type: "object",
  required: [
    "DATABASE_HOST",
    "DATABASE_PORT",
    "MONGO_INITDB_ROOT_USERNAME",
    "MONGO_INITDB_ROOT_PASSWORD",
    "MONGO_INITDB_DATABASE",
    "SERVER_HOST",
    "SERVER_PORT",
  ],

  properties: {
    DATABASE_HOST: { type: "string" },
    DATABASE_PORT: { type: "string" },
    MONGO_INITDB_ROOT_USERNAME: { type: "string" },
    MONGO_INITDB_ROOT_PASSWORD: { type: "string" },
    MONGO_INITDB_DATABASE: { type: "string" },
    SERVER_HOST: { type: "string" },
    SERVER_PORT: { type: "string" },
  },
};
const fastifyEnvConfig = {
  schema: schema,
  dotenv: true,
};

export default fastifyEnvConfig;
