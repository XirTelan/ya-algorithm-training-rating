import { ContestDTO } from "@/types";

export async function getContests(): Promise<ContestDTO[]> {
  const responce = await fetch(`/api/contests`);
  if (responce.ok) {
    const result = await responce.json();
    return result;
  } else return [];
}

export async function deleteContest(id: string) {
  const res = await fetch(`/api/contests/${id}`, {
    method: "DELETE",
  });
  const { success } = await res.json();
  if (success) {
    return { success: true };
  } else {
    return { success: false };
  }
}

export async function postContests(data: ContestDTO[]) {
  const res = await fetch(`/api/contests`, {
    method: "POST",
    body: JSON.stringify({ contests: data }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return { success: true };
  } else {
    return { success: false };
  }
}
