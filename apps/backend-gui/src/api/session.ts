import axiosInstance from "@/lib/axios";
import { SessionDTO } from "@/types";

export async function updateSession(sessionId: string) {
  try {
    const res = await axiosInstance.post(`/api/session`, {
      sessionId: sessionId,
    });
    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getSession(): Promise<SessionDTO | undefined> {
  try {
    const res = await axiosInstance(`/api/session`);
    if (res.status === 200) {
      return await res.data;
    }
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
