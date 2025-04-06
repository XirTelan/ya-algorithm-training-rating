import { StatisticTaskAttempts, StatisticTaskTotal } from "../../types";
import Rating from "../models/Rating.js";
import { logger } from "../server.js";

async function getStatTaskTotal(): Promise<StatisticTaskTotal[]> {
  try {
    const results = await Rating.aggregate([
      {
        $group: {
          _id: "$userId",
          totalTasks: { $sum: "$tasks" },
        },
      },
      {
        $group: {
          _id: "$totalTasks",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalTasks: "$_id",
          userCount: "$count",
        },
      },
      {
        $sort: { totalTasks: -1 },
      },
    ]);
    return results;
  } catch (error) {
    logger.error(error, "Error getStatTaskTotal:");
    return [];
  }
}

async function getStatTaskWithAttempts(): Promise<StatisticTaskAttempts[]> {
  try {
    const results = await Rating.aggregate([
      {
        $group: {
          _id: "$userId",
          totalTasks: { $sum: "$tasks" },
          totalTries: { $sum: "$tries" },
        },
      },
      {
        $match: {
          totalTries: { $lte: 10 },
        },
      },
      {
        $group: {
          _id: { totalTasks: "$totalTasks", totalTries: "$totalTries" },
          userCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalTasks: "$_id.totalTasks",
          totalTries: "$_id.totalTries",
          userCount: "$userCount",
        },
      },
      {
        $sort: { totalTasks: -1, totalTries: 1 },
      },
    ]);

    return results;
  } catch (err) {
    logger.error(
      err,
      "Error aggregating user counts by totalTasks and totalTries:"
    );
    return [];
  }
}

export default {
  getStatTaskTotal,
  getStatTaskWithAttempts,
};
