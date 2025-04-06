const schema = {
  type: "object",
  required: [
    "DATABASE_HOST",
    "DATABASE_PORT",
    "MONGO_BACKEND_USERNAME",
    "MONGO_BACKEND_PASSWORD",
    "MONGO_BACKEND_DATABASE",
  ],

  properties: {
    DATABASE_HOST: { type: "string" },
    DATABASE_PORT: { type: "string" },
    MONGO_BACKEND_USERNAME: { type: "string" },
    MONGO_BACKEND_PASSWORD: { type: "string" },
    MONGO_BACKEND_DATABASE: { type: "string" },
  },
};
const fastifyEnvConfig = {
  schema: schema,
  dotenv: true,
};

export default fastifyEnvConfig;
