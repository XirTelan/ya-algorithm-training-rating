import { useEffect } from "react";
import { useForm, FieldValues, useFieldArray } from "react-hook-form";

import { EllipsisVertical, Info, X } from "lucide-react";
import { Contest } from "@/types";
import { Button } from "@repo/ui/button";
import { toast } from "@repo/ui";
import { Card, CardContent, CardFooter } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@repo/ui/tooltip";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ActiveContests = () => {
  const { register, control, handleSubmit, reset } = useForm<{
    contests: Contest[];
    delete?: string[];
  }>();

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "contests", // unique name for your Field Array
  });

  useEffect(() => {
    async function loadData() {
      const responce = await fetch(`${BACKEND_URL}/contests`);
      if (responce.ok) {
        const result = await responce.json();
        if (result.success) {
          reset({ contests: result.data });
        }
      }
    }
    loadData();
  }, [reset]);

  const addContest = () => {
    append({
      contestId: "",
      contestTitle: `Contest_${fields.length}`,
      autoUpdate: 0,
      attempts: "",
      status: "",
      date: undefined,
    });
  };

  const deleteContest = async (indx: number) => {
    if ("_id" in fields[indx]) {
      const res = await fetch(`${BACKEND_URL}/contests/${fields[indx]._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast("Delete Contest", {
          description: "success",
        });
      }
    }
    remove(indx);
  };

  const submit = async (data: FieldValues) => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(`${BACKEND_URL}/contests`, {
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
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Card>
          <CardContent>
            <Table className="mt-4  ">
              <TooltipProvider>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">
                      <div className="flex  items-center">
                        Contest ID <span className=" text-red-600 mx-2">*</span>{" "}
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={18} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>example:</p>
                            <p>https://contest.yandex.ru/contest/XXXXXX/</p>
                            <p> where XXXXXX - id</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="w-60  text-center">
                      Contest Name
                    </TableHead>
                    <TableHead className="text-center">Autoupdate</TableHead>
                    <TableHead className="text-center">
                      Count attempts{" "}
                    </TableHead>
                    <TableHead className="text-center">
                      <div className="flex w-full items-center justify-center">
                        <EllipsisVertical />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </TooltipProvider>
              <TableBody>
                {fields.map((contest, indx) => (
                  <TableRow key={`${contest.contestId}_${indx}`}>
                    <TableCell className="font-medium">
                      <div>
                        <Input
                          id="contestId"
                          type="text"
                          {...register(`contests.${indx}.contestId`)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        id="contestTitle"
                        type="text"
                        placeholder="Display name e.g. Contest-1"
                        {...register(`contests.${indx}.contestTitle`)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        id="autoUpdate"
                        type="number"
                        placeholder="Time in minuts. 0 or empty - Disabled  "
                        {...register(`contests.${indx}.autoUpdate`)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        id="attempts"
                        type="text"
                        {...register(`contests.${indx}.attempts`)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        size={"icon"}
                        variant={"destructive"}
                        onClick={() => deleteContest(indx)}
                      >
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="h-2 w-full  border-b-border border-b" />
            <Button
              className="mt-2 "
              type="button"
              variant={"default"}
              onClick={addContest}
            >
              Add contest
            </Button>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ActiveContests;
