import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

import { RatingDTO } from "@/types";
import useGetContests from "@/shared/api/contests";

type RatingTableProps = {
  data: RatingDTO;
};

const RatingTable = ({ data }: RatingTableProps) => {
  const { data: contests } = useGetContests();

  return (
    <Table className=" relative">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">№</TableHead>
          <TableHead>Имя участника</TableHead>
          {contests.map((contest) => {
            return (
              <TableHead key={`${contest.contestId}`}>
                {contest.contestTitle}
              </TableHead>
            );
          })}
          <TableHead>Задач</TableHead>
          <TableHead>Попыток</TableHead>
          <TableHead>Штраф</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.items.map((item, i) => (
          <TableRow key={i}>
            <TableCell>{item.position}</TableCell>
            <TableCell>{item._id}</TableCell>
            {contests.map((contest) => {
              return (
                <TableCell
                  key={`${contest.contestId}`}
                >{`${item.byContest[contest.contestId]?.tasks || 0} | ${
                  item.byContest[contest.contestId]?.fine || 0
                }`}</TableCell>
              );
            })}
            <TableCell>{item.totalTasks}</TableCell>
            <TableCell>{item.totalTries}</TableCell>
            <TableCell>{item.totalFine}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2 + contests.length}>Всего участников:</TableCell>
          <TableCell colSpan={3} className="text-right">
            {data.totalCount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default RatingTable;
