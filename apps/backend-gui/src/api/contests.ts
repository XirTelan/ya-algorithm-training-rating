import axiosInstance from "@/lib/axios";
import { ContestDTO } from "@/types";

export async function getContests(): Promise<ContestDTO[]> {
  const responce = await axiosInstance(`/api/contests`);
  if (responce.status == 200) {
    return responce.data;
  } else return [];
}

export async function deleteContest(id: string) {
  const res = await axiosInstance.delete(`/api/contests/${id}`);
  const { success } = await res.data;
  if (success) {
    return { success: true };
  } else {
    return { success: false };
  }
}

export async function postContests(data: ContestDTO[]) {
  const res = await axiosInstance.post(`/api/contests`, { contests: data });
  if (res.status === 200) {
    return { success: true };
  } else {
    return { success: false };
  }
}
