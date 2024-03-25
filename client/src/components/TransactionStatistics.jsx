import React from "react";

const TransactionStatistics = ({ data }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="text-xl sm:text-2xl font-semibold mb-3">Transaction Statistics</div>
      <div className="w-full rounded-lg border shadow">
        <div className="w-full text-xs sm:text-sm lg:text-base grid grid-cols-2 gap-0.5 *:shadow odd:capitalize odd:text-secondary-col even:bg-secondary-bg-col *:px-4 *:py-2 *:bg-secondary-bg-col rounded-lg overflow-hidden">
          <div>Sale Amount</div>
          <div className="flex gap-x-0.5">
            <span className=" font-bold text-green-500 mr-1">₹</span>
            {data?.saleAmount}
          </div>
          <div>Sold Items</div>
          <div className="text-green-500 font-bold">{data?.soldItems}</div>
          <div>Unsold Items</div>
          <div className="text-red-500 font-bold">{data?.unSoldItems}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatistics;
