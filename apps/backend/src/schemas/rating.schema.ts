const ratingAggregatedDTOSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    position: { type: "number" },
    totalTasks: { type: "number" },
    totalFine: { type: "number" },
    totalTries: { type: "number" },
    byContest: {
      type: "object",
      additionalProperties: true,
    },
  },
  required: ["_id", "position", "totalTasks", "totalFine", "totalTries"],
};

const ratingResponseSchema = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: ratingAggregatedDTOSchema,
    },
    totalCount: { type: "number" },
  },
  required: ["items", "totalCount"],
};

export default {
  ratingAggregatedDTOSchema,
  ratingResponseSchema,
};
