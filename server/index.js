// index.js

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const sequelize = require("./models/index");
const seedExistingDataService = require("./services/seedExistingDataService");

// Import routes
const transactionsRoutes = require("./routes/transactionsRoutes");
const seedExistingDataRoutes = require("./routes/seedExistingDataRoutes");
const statisticsRoutes = require("./routes/statisticsRoutes");
const barChartRoutes = require("./routes/barChartRoutes");
const pieChartRoutes = require("./routes/pieChartRoutes");
const statisticsAndChartsRoutes = require("./routes/statisticsAndChartsRoutes");
// const statisticsRoutes = require('./routes/statisticsRoutes');
// const barChartRoutes = require('./routes/barChartRoutes');
// const pieChartRoutes = require('./routes/pieChartRoutes');

app.use(cors());

// Use routes
app.get("/", async (req, res) => {
  res.send("This is Roxiler Backend API Task!");
});

app.use("/transactions", transactionsRoutes);
app.use("/seed-database", seedExistingDataRoutes);
app.use("/statistics", statisticsRoutes);
app.use("/barchart", barChartRoutes);
app.use("/piechart", pieChartRoutes);
app.use("/statisticsandcharts", statisticsAndChartsRoutes);
// app.use('/statistics', statisticsRoutes);
// app.use('/bar-chart', barChartRoutes);
// app.use('/pie-chart', pieChartRoutes);

// Sync database and start the server
sequelize
  .sync()
  .then(async () => {
    await seedExistingDataService.seedData();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
