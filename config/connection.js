const Sequelize = require("sequelize");
// Enable access to .env variables
require("dotenv").config();

let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Use environment variables to connect to database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      // Database location
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
