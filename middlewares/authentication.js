const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const Role = require("../enums/Roles");

const Authentication = async (req, res, next) => {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    res.locals.tokendata = user;
    next();
  });
};

module.exports = Authentication;
