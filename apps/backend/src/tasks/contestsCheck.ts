import { FastifyInstance } from "fastify";
import contestService from "../services/contestService.js";
import { fetchLeaderbord } from "../lib/parser.js";
import logService from "../services/logService.js";
import { logger } from "../server.js";

export default async function contestsCheck(fastify: FastifyInstance) {
  fastify.log.info("Starting background job: checkContests");
  setInterval(checkContests, 60_000);
}

async function checkContests() {
  try {
    const contests = await contestService.getContests();
    contests.forEach(async (contest) => {
      if (
        !contest.date ||
        (contest.autoUpdate > 5 &&
          Date.now() - contest.autoUpdate * 60 * 1000 > contest.date)
      ) {
        await fetchLeaderbord(contest.contestId);
        const msg = `${
          contest.contestId
        } updated ${new Date().toLocaleString()}`;
        logService.addLogEntry(msg, "info");
        logger.info(msg);
      }
    });
  } catch (error) {
    console.error(error);
  }
}
