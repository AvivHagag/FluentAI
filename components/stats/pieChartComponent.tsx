"use client";
import { AreaChart, DonutChart } from "@tremor/react";

const sales = [
  {
    name: "נכון",
    sales: 6,
  },
  {
    name: "לא נכון",
    sales: 4,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export function PieChartComponent() {
  return (
    <DonutChart
      data={sales}
      category="sales"
      label="דקדוק"
      showAnimation={true}
      animationDuration={1200}
      index="name"
      colors={[
        "darkRed",
        "grayish",
        "blue-700",
        "blue-600",
        "blue-500",
        "blue-400",
      ]}
      className="text-xs sm:text-lg md:text-2xl custom-tooltip"
    />
  );
}
