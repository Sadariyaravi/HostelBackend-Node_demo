const Users = require("../models/User");
const bcrypt = require("bcrypt");
const {SERVER_ERROR} = require("../enums/error")

const GetUsers = async (req, res, next) => {
  try {
    Users.findAll().then((result) => {
      res.locals.results = result;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const getUserByContactNo = async (req, res, next) => {
  
  try {
    const user = await Users.findOne({
      where: {
        UserPhoneNumber: req.query.UserPhoneNumber,
      },
    });
    if (!user) return res.status(401).send("User Does Not Exist");

    // Check password is valid or not using bcrypt,compare function it require two parameters simple_password and hash_password
    const passwordValid = await bcrypt.compare(
      req.query.Password,
      user.PasswordHash
    );

    if (!passwordValid)
      return res.status(401).send("Invalid Username or password");

    res.locals.User = user;
    next();
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const AddUser = async (req, res, next) => {
  try {
    Users.create({
      UserName: req.body.UserName,
      UserPhoneNumber: req.body.UserPhoneNumber,
      UserEmailId: req.body.UserEmailId,
      UserRoleID: req.body.UserRoleID,

      // Store password using bcrypt it require main_password and saltrounds.
      PasswordHash: await bcrypt
        .hash(req.body.Password, 10)
        .then((hash) => {
          console.log(hash, req.body.Password);
          return hash;
        })
        .catch((error) => {
          next({ error: { status: SERVER_ERROR, message: error } });
        }),
    }).then((result) => {
      res.locals.result = result;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

module.exports = { GetUsers, getUserByContactNo, AddUser };
