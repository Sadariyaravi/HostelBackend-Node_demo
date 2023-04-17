const Role = require("../models/role");
const User = require("../models/User");
const Post = require("../models/Post");

Role.hasMany(User, {
  foreignKey: "UserRoleID",
});
User.hasMany(Post, {
  foreignKey: "PostedBy",
});
