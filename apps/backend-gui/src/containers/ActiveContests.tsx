import { useForm, useFieldArray } from "react-hook-form";

import useContestForm from "@/hooks/useContestForm";
import ActiveContestFormView from "@/components/ActiveContestFormView";
import { useGetContests } from "@/api/queries";
import { ContestDTO } from "@/types";

export type ContestForm = {
  contests: ContestDTO[];
};

const ActiveContests = () => {
  const { data } = useGetContests();

  const { register, control, handleSubmit } = useForm<ContestForm>({
    defaultValues: {
      contests: data,
    },
    values: { contests: data },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contests",
  });

  const { submit, addContest, handleDelete } = useContestForm(
    fields,
    remove,
    append
  );
  return (
    <ActiveContestFormView
      fields={fields}
      register={register}
      onAdd={addContest}
      onDelete={handleDelete}
      onSubmit={handleSubmit(submit)}
    />
  );
};

export default ActiveContests;
