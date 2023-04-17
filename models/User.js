const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const Users = sequalize.define("UsersInfo", {
  UserName: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  UserPhoneNumber: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  UserEmailId: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  UserRoleID: {
    type: DataTypes.INTEGER,
    allownull: false,
  },
  PasswordHash: {
    type: DataTypes.TEXT,
    allownull: false,
  },
});

module.exports = Users;
