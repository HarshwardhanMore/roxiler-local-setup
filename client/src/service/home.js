const axios = require("axios");

const getStatisticsAndChartsData = async (month) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/statisticsandcharts?month=${month}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

module.exports = {
  getStatisticsAndChartsData,
};
