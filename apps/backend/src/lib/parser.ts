import sessionService from "../services/sessionService.js";
import * as cheerio from "cheerio";
import { children } from "cheerio/dist/commonjs/api/traversing";

import { ConfigType, DataEntry } from "../../types";
import contestService from "../services/contestService.js";
import logService from "../services/logService.js";
import { logger } from "../server.js";
import ratingService from "../services/ratingService.js";

const CONTEST_URL = `https://contest.yandex.ru/contest`;


async function fetchContestPage(
  contestId: string,
  page: number,
  sessionId: string
) {
  const url = `${CONTEST_URL}/${contestId}/standings/?p=${page}`;
  const responce = await fetch(url, {
    headers: {
      cookie: `Session_id=${sessionId}`,
    },
    cache: "no-cache",
  });

  return await responce.text();
}

export async function fetchLeaderbord(contestId: string) {
  const session = (await sessionService.getSession()) as ConfigType;
  if (!session?.value) return { success: false };
  const { value: sessionId } = session;
  const constestData = await contestService.getContestById(contestId);

  if (!sessionId) return { success: false };

  const contestInfo = await getContestInfo(contestId, sessionId);

  if (!contestInfo) {
    logService.addLogEntry(`Contest Info null`, "error");
    logger.error(`Contest Info null`);
    return { success: false };
  }

  const queries = [];

  for (let i = 1; i <= contestInfo.lastPage; i++) {
    queries.push(
      parsePage(contestId, i, sessionId, constestData?.attempts ?? "")
    );
  }
  const res = await Promise.all(queries);
  await ratingService.updateRating(
    res.reduce((acc, cur) => [...acc, ...cur], []),
    contestId
  );
  await contestService.updateContestById(contestId, {
    stats: contestInfo.total,
    date: Date.now(),
  });
  return { success: true };
}

export async function getContestInfo(contestId: string, sessionId: string) {
  const $ = cheerio.load(await fetchContestPage(contestId, 1, sessionId));
  const $pager = $(".pager>a")
    .toArray()
    .map((x) => {
      return $(x).text();
    });

  const $top = $(".table__head>.table__row")[0];
  if (!$top || !$top?.childNodes) {
    logService.addLogEntry(`Contest Info: $top.childNodes undefined`, "error");
    logger.error(`Contest Info: $top.childNodes undefined`);
    return null;
  }

  const tasksInfo = $top.childNodes
    .slice(2, $top.childNodes.length - 2)
    .map((x, indx) => {
      const str = $(x).text();
      const [success, attempts] = str.slice(1).split("/").map(Number);
      return { task: str[0], success, attempts };
    });

  const lastPage = Number($pager.at(-1));

  const result = {
    total: tasksInfo ?? [],
    lastPage: isNaN(lastPage) ? 1 : lastPage,
  };
  return result;
}

async function parsePage(
  contestId: string,
  page: number,
  sessionId: string,
  attempts: string
) {
  const $ = cheerio.load(await fetchContestPage(contestId, page, sessionId));

  const tasks = attempts
    .split(",")
    .map(Number)
    .filter((task) => task != 0);

  const $rows = $(".table__body>.table__row");
  const pageData: DataEntry[] = [];
  $rows.each((i, row) => {
    const columnCount = row.childNodes.length;

    const countTries = () => {
      let sum = 0;
      tasks.forEach((task) => {
        if (task > columnCount - 4) return;
        const attemptsChild = $(row.childNodes[1 + task])
          .children()
          .toArray()[0];
        const attempt = $(attemptsChild).text();
        const num = Number(attempt);
        if (num > 100) throw new Error(`${task} - ${attempt}`);
        sum += attempt.startsWith("+") ? Number(attempt) || 0 : 0;
      });
      return sum;
    };

    const newEntry = {
      id: $(row.childNodes[1]).children().attr("title") ?? "",
      tasks: $(row.childNodes[columnCount - 2]).text(),
      fine: $(row.childNodes[columnCount - 1]).text(),
      tries: tasks.length > 0 ? countTries() : 0,
    };
    if (newEntry.id === "") return;
    pageData.push(newEntry);
  });
  return pageData;
}
