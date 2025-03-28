import Rating from "../models/Rating.js";
import { DataEntry } from "../../types";
import logService from "./logService.js";
import { logger } from "../server.js";

export const updateRating = async (data: DataEntry[], contestId: string) => {
  
  logger.info("updateRating: entries count:", data.length);
  if (data.length === 0) {
    logService.addLogEntry(
      "Recive 0 entries from leaderboard update.Check  Session_Id",
      "warning"
    );
    logger.error("Recive 0 entries from leaderboard update.Check  Session_Id");
  }
  const queue = [];
  for (const user of data) {
    const filter = { userId: user.id, contestId: contestId };
    const update = {
      tasks: user.tasks || 0,
      fine: user.fine || 0,
      tries: user.tries || 0,
    };
    queue.push(
      Rating.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      })
    );
  }
  const res = await Promise.all(queue);
};
