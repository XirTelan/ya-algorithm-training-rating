import { FastifySchema } from "fastify";

const withAttempts: FastifySchema = {
  tags: ["statistic"],

  response: {
    200: {
      description: "Successful response",
      type: "array",
      items: {
        type: "object",
        properties: {
          totalTasks: { type: "integer" },
          totalTries: { type: "integer" },
          userCount: { type: "integer" },
        },
      },
    },
  },
};

const taskTotal: FastifySchema = {
  tags: ["statistic"],

  response: {
    200: {
      description: "Successful response",
      type: "array",
      items: {
        type: "object",
        properties: {
          totalTasks: { type: "integer" },
          userCount: { type: "integer" },
        },
      },
    },
  },
};

export default {
  withAttempts,
  taskTotal,
};
