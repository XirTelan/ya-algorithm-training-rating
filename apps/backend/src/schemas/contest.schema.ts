export const contestDTOSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    contestTitle: { type: "string" },
    contestId: { type: "string" },
    autoUpdate: { type: "number" },
    attempts: { type: "string" },
    date: { type: "number" },
    stats: {
      type: "array",
      items: {
        type: "object",
        properties: {
          task: { type: "string" },
          success: { type: "number" },
          attempts: { type: "number" },
        },
        required: ["task", "success", "attempts"],
      },
    },
    status: { type: "string" },
  },
  required: [
    "contestTitle",
    "contestId",
    "autoUpdate",
    "attempts",
    "status",
  ],
};
