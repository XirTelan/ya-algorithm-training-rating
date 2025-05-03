import sessionService from "../services/sessionService.js";
import * as cheerio from "cheerio";

import { ConfigType, DataEntry } from "../../types";
import contestService from "../services/contestService.js";
import logService from "../services/logService.js";
import { logger } from "../server.js";
import ratingService from "../services/ratingService.js";
import { createSemaphore } from "../utils.js";
import axiosInstance from "./axios.js";

const CONTEST_URL = `https://contest.yandex.ru/contest`;

const MAX_PAGES = 10;

async function fetchContestPage(
  contestId: string,
  page: number,
  sessionId: string
): Promise<string> {
  const url = `${CONTEST_URL}/${contestId}/standings/?p=${page}`;
  try {
    const response = await axiosInstance(url, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        cookie: `Session_id=${sessionId}`,
      },
    });

    return response.data;
  } catch (error) {
    logger.error(error, `Error: fetchContestPage ${url}`);
    return "";
  }
}

export async function fetchLeaderbord(contestId: string) {
  const session = (await sessionService.getSession()) as ConfigType;
  if (!session?.value) return { success: false };
  const { value: sessionId } = session;
  const constestData = await contestService.getContestById(contestId);

  if (!sessionId) return { success: false };

  const contestInfo = await getContestInfo(contestId, sessionId);

  if (!contestInfo) {
    const message = `Contest Info null`;
    logService.addLogEntry(message, "error");
    logger.error(message);
    return { success: false };
  }
  const queries = [];
  const semaphore = createSemaphore(MAX_PAGES);
  for (let i = 1; i <= contestInfo.lastPage; i++) {
    await semaphore.acquire();
    queries.push(
      parsePage(contestId, i, sessionId, constestData?.attempts ?? "").finally(
        () => semaphore.release()
      )
    );
  }
  const res = await Promise.all(queries);
  const dataEntries = res.reduce((acc, cur) => [...acc, ...cur], []);

  await ratingService.updateRating(dataEntries, contestId);
  await contestService.updateContestById(contestId, {
    stats: contestInfo.total,
    date: Date.now(),
  });
  return { success: true };
}

export async function getContestInfo(contestId: string, sessionId: string) {
  const text = await fetchContestPage(contestId, 1, sessionId);
  if (!text) return null;
  const $ = cheerio.load(text);

  const $headerRow = $(".table__head > .table__row").first();

  if (!$headerRow || !$headerRow[0]?.childNodes) {
    const message = `Contest Info: Table header row undefined`;
    logService.addLogEntry(message, "error");
    logger.error(message);
    return null;
  }

  const taskNodes = $headerRow[0].childNodes.slice(2, -2);
  const tasksInfo: TaskInfo[] = [];

  for (const node of taskNodes) {
    const text = $(node).text().trim();
    const task = text[0];
    const parts = text.slice(1).split("/");

    if (parts.length !== 2) continue;

    const [success, attempts] = parts.map(Number);
    if (isNaN(success) || isNaN(attempts)) continue;

    tasksInfo.push({ task, success, attempts });
  }

  let lastPage = extractLastPageNumber($);
  if (isNaN(lastPage)) {
    // if its NaN its -> and then there 11th page. look if it last page or more
    const fallbackHtml = await fetchContestPage(contestId, 11, sessionId);
    lastPage = extractLastPageNumber(cheerio.load(fallbackHtml));
  }
  logService.addLogEntry(`Page count: ${lastPage}`, "info");

  return {
    total: tasksInfo,
    lastPage: !lastPage || isNaN(lastPage) ? 1 : lastPage,
  };
}

function extractLastPageNumber($: cheerio.CheerioAPI) {
  const pages = $(".pager > a")
    .toArray()
    .map((el) => Number($(el).text()));
  return pages.at(-1) ?? NaN;
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

type TaskInfo = {
  task: string;
  success: number;
  attempts: number;
};
