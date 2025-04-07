import useGetContests from "@/shared/api/contests";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@repo/ui/accordion";
import { Card, CardContent, CardHeader } from "@repo/ui/card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "@repo/ui/table";
import { ExternalLink } from "lucide-react";

export default function SummaryByContest() {
  const { data } = useGetContests();
  return (
    <Card className="w-full">
      <CardHeader>
        Статистика решенных задач (успешно/ всего попыток) по каждому контесту
      </CardHeader>
      <CardContent>
        <Accordion collapsible type="single">
          {data.map((contest) => (
            <AccordionItem
              key={contest.contestId}
              value={`${contest.contestId}`}
            >
              <AccordionTrigger
                aria-controls={`panel-${contest._id}-content`}
                id={`panel-${contest._id}-header`}
              >
                <div className="flex">
                  <h2 className="me-2">{contest.contestTitle}</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <a
                  href={`https://contest.yandex.ru/contest/${contest.contestId}/standings/`}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <div className="flex items-center gap-1  ">
                    Открыть Яндек контест ({contest.contestId})
                    <ExternalLink size={16} />
                  </div>
                </a>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {contest.stats.map((stat) => (
                        <TableHead key={`${contest.contestId}_${stat.task}`}>
                          {stat.task}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      {contest.stats.map((row) => (
                        <TableCell
                          key={`${contest.contestId}_${row.task}`}
                          scope="row"
                        >
                          <div className=" text-green-700  ">{row.success}</div>
                          <div className=" text-gray-500  ">{row.attempts}</div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
