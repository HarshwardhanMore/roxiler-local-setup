import React, { useState, useEffect } from "react";
import TransactionTable from "../components/TransactionTable";
import TransactionStatistics from "../components/TransactionStatistics";
import TransactionPieChart from "../components/TransactionPieChart";
import TransactionBarChart from "../components/TransactionBarChart";
import { CalendarDays, Search } from "lucide-react";
import axios from "axios";
import Loading from "../components/Loading";
// import { getStatisticsAndChartsData } from "../service/home.js";

const Home = () => {
  const [month, setMonth] = useState("01");
  const [statisticsAndChartsData, setStatisticsAndChartsData] = useState(null);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [forcedChange, setForcedChange] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/statisticsandcharts?month=${month}`
        );
        setStatisticsAndChartsData(response.data);
        // setLoading(false);
        // if (response.statusCode === 200) {
        // }
        console.log("data : ", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [month]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setForcedChange(false);
    setPage(1);
    setRowsPerPage(10);
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-12 xl:px-24">
      <div className="w-full sticky top-0 z-40 bg-primary-bg-col py-6 h-max snap snap-y snap-mandatory">
        <div className="w-full h-max flex flex-row justify-between items-center gap-x-2">
          <div>
            <img src="/roxiler_icon.jpg" alt="icon" />
          </div>
          <div className="h-full w-max flex flex-row gap-x-2">
            <div className="flex gap-x-1 sm:gap-x-2 items-center px-2 rounded-lg bg-secondary-bg-col border shadow">
              <CalendarDays size={18} className="text-primary-col" />
              <select
                name="month"
                id="month"
                value={month}
                onChange={handleMonthChange}
                className="text-secondary-col text-sm py-2 sm:py-2.5 cursor-pointer *:cursor-pointer"
              >
                <option
                  disabled
                  value=""
                  className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
                >
                  Select Month
                </option>
                {months.map((monthName, index) => (
                  <option
                    key={index}
                    value={
                      `${index + 1 >= 10 ? "" : "0"}` + (index + 1).toString()
                    }
                    className="text-secondary-col px-4 py-2.5 rounded-lg bg-secondary-bg-col"
                  >
                    {monthName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-3 xl:py-6 snap snap-y snap-mandatory">
        <div className="h-full">
          <TransactionTable
            month={month}
            forcedChange={forcedChange}
            setForcedChange={setForcedChange}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </div>
      </div>
      <div className="w-full py-3 xl:py-6 snap snap-y snap-mandatory">
        <div className="h-full">
          <TransactionStatistics
            month={month}
            data={statisticsAndChartsData?.statistics}
          />
        </div>
      </div>
      <div className="w-full py-3 xl:py-6 snap snap-y snap-mandatory">
        <div className="h-full">
          <TransactionPieChart
            month={month}
            data={statisticsAndChartsData?.pieCharts}
          />
        </div>
      </div>
      <div className="w-full py-3 xl:py-6 snap snap-y snap-mandatory overflow-x-scroll  ">
        <div className="h-full">
          <TransactionBarChart
            month={month}
            data={statisticsAndChartsData?.barCharts}
          />
        </div>
      </div>
      {/* {loading && <Loading />} */}
    </div>
  );
};

export default Home;
