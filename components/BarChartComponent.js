"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Config for chart labels and colors
const chartConfig = {
  emails_sent_count: {
    label: "Sent",
    color: "hsl(var(--chart-1))",
  },
  emails_open_count: {
    label: "Opened",
    color: "hsl(var(--chart-2))",
  },
  emails_unsubscribe_count: {
    label: "Unsubscribed  ",
    color: "hsl(var(--chart-3))",
  },
};

function BarChartComponent({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email data</CardTitle>
        <CardDescription>Website Email Stats</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="website_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.split(" ")[0]} // Shorten the names if too long
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="emails_sent_count"
              fill="var(--color-emails_sent_count)"
              radius={4}
            />
            <Bar
              dataKey="emails_open_count"
              fill="var(--color-emails_open_count)"
              radius={4}
            />
            <Bar
              dataKey="emails_unsubscribe_count"
              fill="var(--color-emails_unsubscribe_count)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing email stats for 4 websites
        </div>
      </CardFooter>
    </Card>
  );
}

export default BarChartComponent;
