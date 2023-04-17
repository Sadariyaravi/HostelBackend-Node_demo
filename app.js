// import packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const sequalize = require("./config/db.connection");
require("./models/index");

// Import All Route for use
const RoleRoute = require("./routes/role.route");
const UserRoute = require("./routes/user.route");
const PostRouter = require("./routes/post.route");


// use bodyparser for access body data in http request
// middleware
app.use(bodyParser.json(),cors());

//Declare Routes for api
app.use(UserRoute, RoleRoute, PostRouter);

// Route Not Found Errors(for invalid routes)
app.use("*", (req, res) => {
  res.status(404).json({ message: "Invalid route!" });
});


// Error handler
app.use((error, req, res, next) => {
  if (error.error && error.error.detail) {
    res.status(error.error.status || 500).send({ message: error.error.detail });
  } else {
    res
      .status(error.error.status || 500)
      .send({ message: error.error.message });
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
