
const mongoose = require('mongoose');
// const mysql = require('mysql2/promise');

const connectMongo = async () => {
  return mongoose.connect(process.env.MONGO_URI);
};

// const connectMySQL = async () => {
//   return mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'lawyer_booking'
//   });
// };

// module.exports = { connectMongo, connectMySQL };
module.exports = { connectMongo};
