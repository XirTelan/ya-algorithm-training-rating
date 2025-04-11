import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

import { Separator } from "@repo/ui/separator";
import { useGetStatisticTasks } from "@/features/statistic/api/useGetStatistic";
import { chartConfig } from "../configs/chartConfig";
export const SummaryByTaskAttemptts = () => {
  const { data: summary } = useGetStatisticTasks();

  const chartData = useMemo(
    () =>
      summary.slice(0, Math.min(summary.length, 25)).map((stat) => {
        return {
          x: `${stat.totalTasks}/${stat.totalTries}`,
          y: stat.userCount,
        };
      }),
    [summary]
  );

  return (
    <div className="flex flex-col items-center ">
      <Card className="flex w-full">
        <CardHeader>
          <CardTitle>Кол-во задач/попыток</CardTitle>
          <CardDescription>
            Отображает лучшие 25 результатов. Полная таблица со всеми
            результатами ниже
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-50 w-full" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="x"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                name={"Количество"}
                dataKey="y"
                fill="var(--color-desktop)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Separator className="my-4" />
      <Card className="w-full">
        <CardContent>
          <Accordion type="multiple">
            <AccordionItem value="1">
              <AccordionTrigger
                aria-controls={`panel-stats-content`}
                id={`panel-stats-header`}
              >
                Полная таблица по колву с учетом *
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Кол-во задач</TableHead>
                      <TableHead>Кол-во ппопыток</TableHead>
                      <TableHead>Количество решивших</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {summary.map((row, indx) => (
                      <TableRow key={indx}>
                        <TableCell>{row.totalTasks}</TableCell>
                        <TableCell>{row.totalTries}</TableCell>
                        <TableCell>{row.userCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
