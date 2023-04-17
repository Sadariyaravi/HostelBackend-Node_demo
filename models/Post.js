const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");


const Posts = sequalize.define("Posts", {
  PostTitle: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  PostBody: {
    type: DataTypes.TEXT,
    allownull: false,
  },
  PostedBy: {
    type: DataTypes.INTEGER,
    allownull: false,
  },
});

module.exports = Posts;
