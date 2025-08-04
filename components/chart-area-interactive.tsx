"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


export const description = "An interactive area chart"



interface ChartAreaInteractiveProps {
  data: { date: string; errollments: number }[];
}

const chartConfig = {
  errollments: {
    label: "Errollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
 
    const total = React.useMemo(
      () => data.reduce((acc, cur) => acc + cur.errollments, 0),
      [data]
    );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Errollments</CardTitle>
        <CardDescription className="!px-0">
          <span className="hidden xl:block">
            Total errollments for the last 30 days: {total}
          </span>
          <span className="xl:hidden block">Last 30 days: {total}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart margin={{ left: 12, right: 12 }} data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={"errollments"} fill="#6366f1" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
