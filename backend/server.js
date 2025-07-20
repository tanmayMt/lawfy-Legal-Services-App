
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const { connectMongo, connectMySQL} = require('./config/db');
const userRoutes = require('./routes/authRoutes');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //This middleware parses incoming 
// Use morgan middleware
app.use(morgan('dev'));  // 'dev' is a preset format

// Routes
app.use('/api/auth', userRoutes);
// app.use('/api/bookings', require('./routes/bookingRoutes'));

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Lawfy backend is running</h1>");
});


// Connect to database
connectMongo();
connectMySQL();
//  DB Switch: 'mongo' or 'mysql'
// (async () => {
//   try {
//     if (process.env.DB_TYPE === 'mongo') {
//       await connectMongo();
//       console.log('✅ MongoDB Connected');
//     } else {
//       const mysql = await connectMySQL();
//       global.mysql = mysql; // For use in controllers
//       console.log('✅ MySQL Connected');
//     }
//   } catch (err) {
//     console.error('❌ Database Connection Failed:', err.message);
//     process.exit(1);
//   }
// })();


// Start Server

// Routes

app.use('/api/auth', userRoutes);
// app.use('/api/bookings', require('./routes/bookingRoutes'));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to Lawyer Booking App API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
