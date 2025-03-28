import Config from "../models/Config.js";

async function getSession() {
  const res = await Config.findOne({ name: "sessionId" }).lean();
  return res;
}

async function updateSession(newValue: string) {
  try {
    const res = await Config.findOne({ name: "sessionId" });
    if (!res) {
      const newEntry = new Config({
        name: "sessionId",
        value: "newValue",
      });
      await newEntry.save();
    } else {
      res.value = newValue;
      await res.save();
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export default {
  getSession,
  updateSession,
};
