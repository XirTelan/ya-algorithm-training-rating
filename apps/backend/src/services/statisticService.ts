import { ContestDTO } from "../../types";
import Rating from "../models/Rating";
import { logger } from "../server";
import contestService from "./contestService";

async function getStatTaskTotal() {
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
    return undefined;
  }
}

async function getStatTaskWithAttempts() {
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
  }
}

export default {
  getStatTaskTotal,
  getStatTaskWithAttempts,
};
