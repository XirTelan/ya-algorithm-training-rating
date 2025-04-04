import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";

import { RatingDTO } from "@/types";

type RatingTableProps = {
  data: RatingDTO;
};

const RatingTable = ({ data }: RatingTableProps) => {
  return (
    <Table className=" relative">
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">№</TableHead>
          <TableHead>Имя участника</TableHead>
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
            <TableCell>{item.totalTasks}</TableCell>
            <TableCell>{item.totalTries}</TableCell>
            <TableCell>{item.totalFine}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{data.totalCount}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default RatingTable;
