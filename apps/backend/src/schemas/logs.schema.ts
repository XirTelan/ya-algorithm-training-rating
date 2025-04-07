import { FastifySchema } from "fastify";
import { logDTOSchema } from "./log.schema.js";

const getSchema: FastifySchema = {
  tags: ["logs"],
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "array",
          items: logDTOSchema,
          minItems: 0,
        },
      },
    },
    400: {
      type: "object",
      properties: {
        success: { type: "boolean", const: false },
        data: {
          type: "array",
          items: {},
          minItems: 0,
        },
      },
    },
  },
};

export default {
  getSchema,
};
