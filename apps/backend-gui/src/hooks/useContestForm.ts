import { deleteContest, postContests } from "@/api/contests";
import { ContestForm } from "@/containers/ActiveContests";
import { ContestDTO } from "@/types";
import { toast } from "@repo/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";

export default function useContestForm(
  fields: ContestDTO[],
  remove: UseFieldArrayRemove,
  append: UseFieldArrayAppend<ContestForm>
) {
  const queryClient = useQueryClient();

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

  const handleDelete = useCallback(
    async (index: number) => {
      const field = fields[index];
      if ("_id" in field && field._id) {
        try {
          const { success } = await deleteContest(field._id);
          if (success) {
            toast("Delete Contest", { description: "Success" });
            queryClient.invalidateQueries({ queryKey: ["contests"] });
          } else {
            toast("Delete Contest", { description: "Failed" });
          }
        } catch (error) {
          console.log(error);
          toast("Delete Contest", { description: "Error deleting contest" });
        }
      }
      remove(index);
    },
    [fields, queryClient, remove]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: postContests,
    onSuccess: () => {
      toast("Save Contests", { description: "Saved successfully" });
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
    onError: () => {
      toast("Save Contests", { description: "Failed to save contests" });
    },
  });

  const submit = useCallback(
    async (data: FieldValues) => {
      mutate(data.contests);
    },
    [mutate]
  );

  return {
    addContest,
    handleDelete,
    submit,
    isSubmitting: isPending,
  };
}
