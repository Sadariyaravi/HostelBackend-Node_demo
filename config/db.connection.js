const Sequelize = require("sequelize");

// DB-connection config it use db_name,Username,password,port,host
// store this items into .env files. 


const sequalize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: process.env.PGDIALECT,
    logging: false,
  }
);

sequalize
  .authenticate()
  .then(() => console.log("Database Connected."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequalize;
