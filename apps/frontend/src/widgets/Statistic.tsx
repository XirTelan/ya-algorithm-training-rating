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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import {
  useGetStatisticContest,
  useGetStatisticSummary,
} from "@/features/statistic/api/useGetStatistic";
import { Separator } from "@repo/ui/separator";
import SummaryByContest from "@/features/statistic/components/SummaryByContest";

const Statistic = () => {
  const { data: summary } = useGetStatisticSummary();

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
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <div className="mt-4 flex flex-col items-center ">
      <Card className="flex w-full">
        <CardHeader>
          <CardTitle>Кол-во задач/попыток</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
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
      {/* 
      {data.stats && data.stats.length > 0 && (
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              dataKey: "tasks",
              label: "Кол-во задач",
            },
          ]}
          dataset={data.stats ?? []}
          series={[{ dataKey: "value", label: "Распределение по задачам" }]}
          yAxis={[{ label: "Количество решивших" }]}
          {...chartSetting}
        />
      )} */}
      <Separator className="my-4" />
      <SummaryByContest />
    </div>
  );
};

export default Statistic;
