import Rating from "../models/Rating";
import { logger } from "../server";
import contestService from "./contestService";

async function getStatistic() {
  const [contestUserCount, contestSumByTaskTries] = await Promise.all([
    getCountWithMaxTasksForEachContest(),
    getUserCountByTotalTasksAndTotalTries(),
  ]);
  return { contestUserCount, contestSumByTaskTries };
}

async function getCountWithMaxTasksForEachContest() {
  const contests = await contestService.getContests();
  const queue: Promise<unknown>[] = [];
  contests.forEach((contest) => {
    queue.push(
      Rating.countDocuments({
        contestId: contest.contestId,
        tasks: contest.stats.length,
      })
    );
  });
  const queryRes = await Promise.all(queue);
  const dataRes = contests.map((contest, indx) => {
    return { id: contest.contestId, count: queryRes[indx] };
  });
  return dataRes;
}

async function getUserCountByTotalTasksAndTotalTries() {
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
  getStatistic,
};
