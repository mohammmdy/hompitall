const mongoose = require("mongoose");
//connect to mongoose URI
const dbConnection = () => {
  mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log(`database connected: ${conn.connection.host}`);
  });
};

module.exports = dbConnection;
