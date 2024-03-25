// controllers/seedExistingDataController.js

const seedExistingDataService = require("../services/seedExistingDataService");

exports.seedData = async (req, res) => {
  try {
    await seedExistingDataService.seedData();
    res.json({ data: true, message: "Database initialized with seed data" }); // Send response to indicate success
  } catch (error) {
    console.error("Error seeding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
