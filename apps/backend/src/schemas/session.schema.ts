import { FastifySchema } from "fastify";

const getSchema: FastifySchema = {
  tags: ["session"],
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        value: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};

const postSchema: FastifySchema = {
  tags: ["session"],
  body: {
    type: "object",
    properties: {
      sessionId: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Empty 200 OK response",
      type: "null",
    },
  },
};

export default {
  getSchema,
  postSchema,
};
