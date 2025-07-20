
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const dotenv = require("dotenv");

dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
  }
};

const connectMySQL = async () => {
  try {
    await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
   });
   console.log('✅ MySQL connected successfully');
  } catch (error) {
    console.error('❌ MySQL Connection Failed:', error.message);
  }
};
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = { connectMongo, connectMySQL,pool };
// module.exports = { connectMongo};
