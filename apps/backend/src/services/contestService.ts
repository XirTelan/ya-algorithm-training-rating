import Contest from "../models/Contest.js";
import { ContestDTO } from "../../types.js";
import { logger } from "../server.js";

async function getContests(): Promise<ContestDTO[]> {
  try {
    const res = (await Contest.find(
      {},
      { updatedAt: 0, "stats._id": 0 }
    ).lean()) as unknown as ContestDTO[];
    return res;
  } catch (error) {
    logger.error(error, "contestService/getContests");
    return [];
  }
}
async function getContestById(id: string): Promise<ContestDTO | null> {
  try {
    const res = await Contest.findOne({ contestId: id }).lean();
    return res as ContestDTO | null;
  } catch (error) {
    logger.error(error, `contestService/getContestById with ID: ${id}`);
    return null;
  }
}
async function deleteContest(id: string) {
  try {
    const res = await Contest.findByIdAndDelete(id);
    return res;
  } catch (error) {
    logger.error(error, `contestService/deleteContest with ID: ${id}`);
  }
}
async function updateContestById(id: string, data: Partial<ContestDTO>) {
  await Contest.findOneAndUpdate(
    {
      contestId: id,
    },
    data
  );
}

async function updateContests(data: ContestDTO[]) {
  try {
    await Promise.all(
      data.map(async (contest) => {
        const { _id, ...rest } = contest;
        if (_id) {
          await Contest.findByIdAndUpdate(_id, rest, { upsert: true });
        } else {
          const newContest = new Contest(rest);
          await newContest.save();
        }
      })
    );
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}

export default {
  getContests,
  getContestById,
  deleteContest,
  updateContestById,
  updateContests,
};
