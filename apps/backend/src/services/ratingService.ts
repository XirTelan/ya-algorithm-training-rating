import Rating from "../models/Rating.js";
import { ContestData, DataEntry } from "../../types";
import logService from "./logService.js";
import { logger } from "../server.js";

async function updateRating(data: DataEntry[], contestId: string) {
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
}

async function buildRaiting(page: number, limit: number) {
  const skip = page * limit;
  const data = await getUsersTotalAndByContest(skip, limit);
  const raiting = data.map((user, indx) => {
    //cant count inside aggretion due sort condition. $documentCount and $rank only for single sort condition
    user.position = skip + indx + 1;
    return {
      ...user,
    };
  });

  const totalUsers = await Rating.aggregate([
    { $group: { _id: "$userId" } },
    { $count: "count" },
  ]);
  logger.info(totalUsers);
  const totalCount = totalUsers[0]?.count || 0;

  return {
    items: raiting,
    totalCount,
  };
}

async function getUsersTotalAndByContest(
  skip: number,
  limit: number = 50
): Promise<ContestData[]> {
  try {
    const results: ContestData[] = await Rating.aggregate([
      {
        $group: {
          _id: "$userId",
          totalTasks: { $sum: "$tasks" },
          totalFine: { $sum: "$fine" },
          totalTries: { $sum: "$tries" },

          byContest: {
            $push: {
              k: "$contestId",
              v: {
                tasks: "$tasks",
                fine: "$fine",
                tries: "$tries",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt",
              },
            },
          },
        },
      },
      {
        $addFields: {
          position: 0,
          byContest: {
            $arrayToObject: "$byContest",
          },
          _id: {
            $switch: {
              branches: [
                {
                  case: { $gte: [{ $indexOfBytes: ["$_id", "@"] }, 0] },
                  then: {
                    $substrBytes: ["$_id", 0, { $indexOfBytes: ["$_id", "@"] }],
                  },
                },
                {
                  case: {
                    $regexMatch: {
                      input: "$_id",
                      regex: /^\+\d+/,
                    },
                  },
                  then: {
                    $concat: [
                      { $substrBytes: ["$_id", 0, 4] },
                      "*******",
                      {
                        $substrBytes: [
                          "$_id",
                          { $subtract: [{ $strLenBytes: "$_id" }, 4] },
                          4,
                        ],
                      },
                    ],
                  },
                },
              ],
              default: "$_id",
            },
          },
        },
      },

      {
        $sort: { totalTasks: -1, totalTries: 1, totalFine: 1 },
      },
      { $skip: skip },
      {
        $limit: limit,
      },
    ]);
    return results;
  } catch (err) {
    logger.error(err, "Error grouping and sorting ratings by userId:");
    return [];
  }
}

export default {
  buildRaiting,
  updateRating,
  getUsersTotalAndByContest,
};
