import { useState } from "react";

import { Info, PackageOpen, ServerCrash, TriangleAlert } from "lucide-react";
import { Card, CardContent } from "@repo/ui/card";
import { Label } from "@repo/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@repo/ui/table";
import { Separator } from "@repo/ui/separator";
import { Filter, LogType } from "@/types";
import { useGetLogs } from "@/api/queries";

const Logger = () => {
  const [filter, setFilter] = useState<Filter>({
    type: "all",
    time: "1",
  });
  const { data: logs } = useGetLogs(filter);

  const iconsType = {
    info: <Info />,
    error: <ServerCrash className=" text-red-700" />,
    warning: <TriangleAlert className=" text-orange-600" />,
  };

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex gap-4 mt-4">
            <Select
              onValueChange={(e: Exclude<LogType, "all">) => {
                setFilter((prev) => ({ ...prev, type: e }));
              }}
              defaultValue={filter.type}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(e) => {
                setFilter((prev) => ({ ...prev, time: e }));
              }}
              defaultValue={filter.time}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Past 1h</SelectItem>
                <SelectItem value="24">Past 24h</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {logs.length == 0 ? (
            <>
              <Separator className="h-[1px] mt-4" />
              <div className="flex justify-center gap-2 text-secondary-foreground  w-full content-center mt-4 ">
                <PackageOpen />
                <p>Logs are empty</p>
              </div>
            </>
          ) : (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 max-w-10">type</TableHead>
                  <TableHead className="w-40 max-w-40">Date</TableHead>
                  <TableHead className=" text-center">Log</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell className="font-medium">
                      <Label>{iconsType[log.type]}</Label>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Label>{new Date(log.createdAt).toLocaleString()}</Label>
                    </TableCell>
                    <TableCell>
                      <Label>{log.message}</Label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Logger;
