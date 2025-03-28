import Log from "../models/Log.js";
import { QueryOptions } from "mongoose";

async function addLogEntry(message: string, type: string) {
  try {
    const newLog = new Log({
      message,
      type,
    });
    await newLog.save();
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
  }
}

async function getLogs(time: number | string, type: string) {
  try {
    const timestamp = new Date(Date.now() - Number(time) * 60 * 60 * 1000);
    const options: QueryOptions = { createdAt: { $gte: timestamp } };
    if (type != "all") {
      options.type = type;
    }
    const res = await Log.find(options).sort({ createdAt: -1 }).lean();
    return {
      success: true,
      data: res,
    };
  } catch (error) {
    console.error(error);
  }
}

export default { addLogEntry, getLogs };
