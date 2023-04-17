const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const Roles = sequalize.define("Roles", {
  Role: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Roles;
