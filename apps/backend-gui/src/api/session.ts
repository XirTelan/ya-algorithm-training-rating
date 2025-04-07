import { SessionDTO } from "@/types";

export async function updateSession(sessionId: string) {
  try {
    const res = await fetch(`/api/session`, {
      method: "POST",
      body: JSON.stringify({
        sessionId: sessionId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
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
    const res = await fetch(`/api/session`);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error(error);
  }
}
