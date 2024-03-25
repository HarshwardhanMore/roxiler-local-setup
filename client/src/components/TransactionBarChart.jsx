import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

// const chartSetting = {
//   xAxis: [
//     {
//       label: "rainfall (mm)",
//     },
//   ],
//   width: 600,
//   height: 500,
// };

const chartSetting = {
  yAxis: [
    {
      label: "Number of Items",
    },
  ],
  series: [{ dataKey: "count", label: "Price Range" }],
  height: 400,
  // sx: {
  //   [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
  //     transform: 'translateX(-10px)',
  //   },
  // },
};

const valueFormatter = (value) => `${value}mm`;

const TransactionBarChart = ({ data }) => {
  console.log("Bar Chart Data : ", data);
  return (
    <div className="flex flex-col items-start w-full">
      <div className="text-xl sm:text-2xl font-semibold mb-3">
        Transaction Bar Chart
      </div>
      <div className="text-primary-col w-full flex flex-col items-center p-6 rounded-lg border shadow bg-secondary-bg-col">
        {/* <BarChart
          dataset={data}
          yAxis={[{ scaleType: "band", dataKey: "range" }]}
          series={[{ dataKey: "count", label: "Count" }]}
          layout="horizontal"
          xAxis={[{ label: "Count" }]}
          width={600}
          height={400}
        /> */}
        {data ? (
          <BarChart
            dataset={data}
            // series={[{ dataKey: "count", label: "Seoul rainfall" }]}
            xAxis={[{ scaleType: "band", dataKey: "range" }]}
            {...chartSetting}
          />
        ) : null}
      </div>
    </div>
  );
};

export default TransactionBarChart;
