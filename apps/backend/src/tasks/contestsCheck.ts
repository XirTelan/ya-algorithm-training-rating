import { FastifyInstance } from "fastify";
import contestService from "../services/contestService.js";
import { fetchLeaderbord } from "../lib/parser.js";
import logService from "../services/logService.js";
import { logger } from "../server.js";

let isJobRunning = false;

export default async function contestsCheck(fastify: FastifyInstance) {
  setInterval(async () => {
    if (isJobRunning) {
      fastify.log.info("Skipping task");
      return;
    }

    isJobRunning = true;
    fastify.log.info(
      `Starting job: checkContests ${new Date().toLocaleString()}`
    );
    await checkContests();
    isJobRunning = false;
  }, 60_000);
}

async function checkContests() {
  try {
    const contests = await contestService.getContests();
    const tasks = contests.map(async (contest) => {
      if (
        !contest.date ||
        (contest.autoUpdate > 0 &&
          Date.now() - contest.autoUpdate * 60 * 1000 > contest.date)
      ) {
        const result = await fetchLeaderbord(contest.contestId);
        if (result) {
          const msg = `${
            contest.contestId
          } updated ${new Date().toLocaleString()}`;
          logService.addLogEntry(msg, "info");
          logger.info(msg);
        }
      }
    });
    await Promise.all(tasks);
  } catch (error) {
    logger.error(error);
  }
}
