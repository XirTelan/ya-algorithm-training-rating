import Rating from "../models/Rating.js";
import { RatingAggregatedDTO, DataEntry, RatingResponse } from "../../types";
import logService from "./logService.js";
import { logger } from "../server.js";
import { removeEmailPhone } from "../utils.js";

async function updateRating(data: DataEntry[], contestId: string) {
  logger.info(`updateRating: entries count:${data.length}`);
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
  await Promise.all(queue);
}

async function filterByUserSearch(search: string): Promise<RatingResponse> {
  const match = await Rating.aggregate([
    {
      $match: {
        userId: {
          $regex: search,
          $options: "i",
        },
      },
    },
    {
      $group: {
        _id: "$userId",
      },
    },
  ]);
  if (match.length == 0) return { items: [], totalCount: 0 };
  const matchSet = new Set(match.map((obj) => obj._id));

  const allUsers = await Rating.aggregate<RatingAggregatedDTO>([
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
      $sort: { totalTasks: -1, totalTries: 1, totalFine: 1 },
    },
  ]);
  let index = 0;
  const results: RatingAggregatedDTO[] = [];
  allUsers.forEach((user) => {
    index++;
    if (!matchSet.has(user._id)) return;
    results.push({ ...user, _id: removeEmailPhone(user._id), position: index });
  });
  return {
    items: results,
    totalCount: results.length,
  };
}

async function buildRaiting(
  page: number,
  limit: number
): Promise<RatingResponse> {
  const skip = page * limit - limit;

  const data = await getUsersTotalAndByContest(skip, limit);
  const raiting = data.map((user, indx) => {
    //cant count inside aggretion due sort condition. $documentCount and $rank only for single sort condition
    return {
      ...user,
      position: skip + indx + 1,
    };
  });
  const totalCount = await getUsersCount();
  return {
    items: raiting,
    totalCount,
  };
}

async function getUsersCount() {
  try {
    const totalUsers = await Rating.aggregate([
      { $group: { _id: "$userId" } },
      { $count: "count" },
    ]);
    const totalCount = totalUsers[0]?.count || 0;
    return totalCount;
  } catch (error) {
    logger.error(error, "getUsersCount");
    return 0;
  }
}

async function getUsersTotalAndByContest(
  skip: number,
  limit: number = 50
): Promise<RatingAggregatedDTO[]> {
  try {
    const results = await Rating.aggregate([
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

async function deleteRecordsByContestId(contestId: string) {
  const deleteResult = await Rating.deleteMany({ contestId });
  return deleteResult;
}

async function deleteAll() {
  try {
    return await Rating.deleteMany({});
  } catch (error) {
    logger.error(error, "Cant delete raings");
    throw error;
  }
}

export default {
  filterByUserSearch,
  buildRaiting,
  updateRating,
  getUsersCount,
  getUsersTotalAndByContest,
  deleteRecordsByContestId,
  deleteAll,
};
