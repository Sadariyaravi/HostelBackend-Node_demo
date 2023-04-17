const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const Role = require("../enums/Roles");

const generateToken = async (req, res, next) => {
  let credential = {};
  var role = Role.find((obj) => {
    return obj.RoleId == res.locals.User.UserRoleID;
  });
  credential = {
    role: role.Role,
    contactNo: res.locals.User.UserPhoneNumber,
    email: res.locals.User.UserEmailId,
  };

  let token = jwt.sign(credential, process.env.JWT_SECRET_KEY, {
    expiresIn: "1800s",
  });
  res.locals.token = token;
  next();
};

module.exports = generateToken;
