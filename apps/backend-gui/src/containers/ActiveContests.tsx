import { useForm, useFieldArray } from "react-hook-form";

import { Contest } from "@/types";

import useContestForm from "@/hooks/useContestForm";
import ActiveContestFormView from "@/components/ActiveContestFormView";

export type ContestForm = {
  contests: Contest[];
};

const ActiveContests = () => {
  const { register, control, handleSubmit, reset } = useForm<ContestForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contests",
  });

  const { submit, addContest, deleteContest } = useContestForm(
    fields,
    reset,
    remove,
    append
  );
  return (
    <ActiveContestFormView
      fields={fields}
      register={register}
      onAdd={addContest}
      onDelete={deleteContest}
      onSubmit={handleSubmit(submit)}
    />
  );
};

export default ActiveContests;
