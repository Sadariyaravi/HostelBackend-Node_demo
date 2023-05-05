const router = require("express").Router();

const UserRoute = router;
const UserController = require("../controllers/user.controller");
const Users = require("../models/User");
const authentication = require("../middlewares/authentication");
const generateToken = require("../middlewares/tokencreate");
const cookieParser = require("cookie-parser");
UserRoute.get("/User", UserController.GetUsers, async (req, res) => {
  res.status(200).send(res.locals.results);
});

// For User Login with number and password params.
UserRoute.post(
  "/login",
  cookieParser(),
  UserController.getUserByContactNo,
  generateToken,
  async (req, res) => {
    res.cookie("acess_token", res.locals.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });
    res.status(200);
    res.json({ message: "Logged in successfully" });
  }
);

// For Token verification.
UserRoute.get("/verify", authentication, async (req, res) => {
  res.status(200).send(res.locals.tokendata);
});

// Signup Apis for user with password hash
UserRoute.post("/SignUp", UserController.AddUser, async (req, res) => {
  res.status(200).send(res.locals.SignupMessage);
});

module.exports = UserRoute;
