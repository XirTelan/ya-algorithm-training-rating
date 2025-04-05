import { ContestForm } from "@/containers/ActiveContests";
import { Contest } from "@/types";
import { toast } from "@repo/ui";
import { useCallback, useEffect } from "react";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReset,
} from "react-hook-form";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function useContestForm(
  fields: Contest[],
  reset: UseFormReset<ContestForm>,
  remove: UseFieldArrayRemove,
  append: UseFieldArrayAppend<ContestForm>
) {
  useEffect(() => {
    async function loadData() {
      const responce = await fetch(`${BACKEND_URL}/api/contests`);
      if (responce.ok) {
        const result = await responce.json();
        reset({ contests: result });
      }
    }
    loadData();
  }, [reset]);

  const addContest = useCallback(() => {
    append({
      contestId: "",
      contestTitle: `Contest_${fields.length}`,
      autoUpdate: 0,
      attempts: "",
      status: "",
      date: undefined,
    });
  }, [append, fields.length]);

  const deleteContest = useCallback(
    async (indx: number) => {
      if ("_id" in fields[indx]) {
        const res = await fetch(
          `${BACKEND_URL}/api/contests/${fields[indx]._id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          toast("Delete Contest", {
            description: "success",
          });
        }
      }
      remove(indx);
    },
    [fields, remove]
  );

  const submit = useCallback(async (data: FieldValues) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(`${BACKEND_URL}/api/contests`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      toast("Contest Data", {
        description: "success update",
      });
    }
  }, []);

  return {
    addContest,
    deleteContest,
    submit,
  };
}
