
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectMongo} = require('./config/db');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Lawfy backend is running</h1>");
});


// Connect to database
(async () => {
  try {
    if (process.env.DB_TYPE === 'mongo') {
      await connectMongo();
      console.log('✅ MongoDB Connected');
    } else {
      const mysql = await connectMySQL();
      global.mysql = mysql; // For use in controllers
      console.log('✅ MySQL Connected');
    }
  } catch (err) {
    console.error('❌ Database Connection Failed:', err.message);
    process.exit(1);
  }
})();


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
