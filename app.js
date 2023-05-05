// import packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const sequalize = require("./config/db.connection");
require("./models/index");
const cookieParser = require("cookie-parser");
// Import All Route for use
const RoleRoute = require("./routes/role.route");
const UserRoute = require("./routes/user.route");
const PostRouter = require("./routes/post.route");
const morgan = require("morgan");
const { any } = require("joi");

// use bodyparser for access body data in http request
// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  }),
  bodyParser.json(),
  morgan("dev")
);
app.use(cookieParser());
//Declare Routes for api
app.use(UserRoute, RoleRoute, PostRouter);

// Route Not Found Errors(for invalid routes)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Invalid route!" });
});

// Error handler
app.use((error, req, res, next) => {
  console.log(error.error);
  if (error.error && error.error.detail) {
    res.status(error.error.status || 500).send({ message: error.error.detail });
  } else {
    res
      .status(error.status || 500)
      .send({ message: error.Message || error.message });
  }
});

// synchronize all sequalize model with database *DB connection
sequalize.sync({ alter: false }, (error, result) => {
  if (error) return error;
  else return result;
});

// Running server on port_no : 3001
app.listen(process.env.PORT || 3333, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
