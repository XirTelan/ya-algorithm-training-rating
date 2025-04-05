import { FastifyRequest, FastifyReply } from "fastify";
import statisticService from "../services/statisticService";
import contestService from "../services/contestService";

export async function getTaskCountByContest(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const contests = await contestService.getContests();
  const res =
    await statisticService.getCountWithMaxTasksForEachContest(contests);
  reply.send(res);
}

export async function getSummaryByTaskAndAttempts(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const res = await statisticService.getUserCountByTotalTasksAndTotalTries();
  reply.send(res);
}
