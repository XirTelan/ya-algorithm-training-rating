import Contest from "../models/Contest.js";
import { ContestDTO } from "../../types.js";

async function getContests() {
  const res = await Contest.find({}, { "stats._id": 0 }).lean();
  return res;
}
async function getContestById(id: string): Promise<ContestDTO | null> {
  const res = await Contest.findOne({ contestId: id }).lean();
  return res as ContestDTO | null;
}
async function deleteContest(id: string) {
  const res = await Contest.findByIdAndDelete(id);
  return res;
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
    console.error(error);
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
