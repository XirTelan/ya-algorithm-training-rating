export const logDTOSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    message: { type: "string" },
    type: { type: "string" },
    createdAt: { type: "string", format: "date-time" }, // Assuming ISO 8601 format
    updatedAt: { type: "string", format: "date-time" }, // Assuming ISO 8601 format
  },
  required: ["message", "type", "createdAt", "updatedAt"],
};
