import React from "react";
import { useGetStatisticTaskTotal } from "../api/useGetStatistic";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/chart";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  BarChart,
} from "recharts";

export default function SummaryByTasks() {
  const { data } = useGetStatisticTaskTotal();


  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <>
      <Card className="flex w-full">
        <CardHeader>
          <CardTitle>Общая статистика по задачам</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-50 w-full" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="totalTasks"
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
                name={"Решило:"}
                dataKey="userCount"
                fill="var(--color-desktop)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={10}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
