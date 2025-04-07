import { FastifySchema } from "fastify";
import { contestDTOSchema } from "./contest.schema.js";

const getSchema: FastifySchema = {
  tags: ["contests"],
  response: {
    200: {
      type: "array",
      items: contestDTOSchema,
    },
  },
};

const postSchema: FastifySchema = {
  tags: ["contests"],
  body: {
    type: "object",
    properties: {
      contests: { type: "array", items: contestDTOSchema },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
      },
    },
    400: {
      type: "object",
      properties: {
        success: { type: "boolean", const: false },
      },
    },
  },
};
const deleteSchema: FastifySchema = {
  tags: ["contests"],
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
  },
};
export default {
  postSchema,
  deleteSchema,
  getSchema,
};
