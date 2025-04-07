import { Separator } from "@repo/ui/separator";

import { Button } from "@repo/ui/button";
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
import { EllipsisVertical, Info, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { ContestForm } from "@/containers/ActiveContests";
import { ContestDTO } from "@/types";

type FormViewProps = {
  fields: ContestDTO[];
  register: ReturnType<
    typeof useForm<ContestForm>
  >["register"];
  onAdd: () => void;
  onDelete: (index: number) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export default function ActiveContestFormView({
  fields,
  register,
  onAdd,
  onSubmit,
  onDelete,
}: FormViewProps) {

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Card>
          <CardContent>
            <Table className="mt-4  ">
              <TooltipProvider>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">
                      <div className="flex items-center">
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
                        onClick={() => onDelete(indx)}
                      >
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {fields.length != 0 && <Separator className="my-4 h-[1px]" />}

            <Button
              className="mt-2 mx-auto flex grow "
              type="button"
              variant={"secondary"}
              onClick={onAdd}
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
}
