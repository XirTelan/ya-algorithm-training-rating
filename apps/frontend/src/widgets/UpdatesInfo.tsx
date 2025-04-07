import useGetContests from "@/shared/api/contests";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

export default function UpdatesInfo() {
  const { data } = useGetContests();

  return (
    <Table aria-label="simple table">
      <TableHeader>
        <TableRow>
          <TableHead align="left">Ид</TableHead>
          <TableHead>Контест</TableHead>
          <TableHead className=" text-center" align="right">
            Последнее обновление
          </TableHead>
          <TableHead className=" text-center" align="right">
            Период автообновления(мин)
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((contest) => (
          <TableRow key={contest.contestId}>
            <TableCell align="left">{contest.contestId}</TableCell>
            <TableCell scope="row">{contest.contestTitle}</TableCell>
            <TableCell align="right">
              {contest.date
                ? new Date(contest.date ?? Date.now()).toLocaleString()
                : "Не обновлялся"}
            </TableCell>
            <TableCell align="right">
              {contest.autoUpdate || "Не обновляется"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
