import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const TransactionPieChart = ({ month, data }) => {
  console.log("data ----> ", data);
  let pieChartData = data
    ? data.map((item, index) => {
        return { id: index, value: item.count, label: item.category };
      })
    : [];
  return (
    <div className="flex w-full flex-col items-start">
      <div className="text-xl sm:text-2xl font-semibold mb-3">Transaction Pie Chart</div>
      <div className="w-full flex flex-col items-center rounded-lg p-6 border shadow bg-secondary-bg-col overflow-x-scroll pie">
        <PieChart
          series={[
            {
              data: [...pieChartData],
            },
          ]}
          width={500}
          height={200}
        />
      </div>
    </div>
  );
};

export default TransactionPieChart;
