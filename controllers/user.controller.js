const Users = require("../models/User");
const bcrypt = require("bcrypt");
const { SERVER_ERROR, BAD_REQUEST } = require("../enums/error");
const Joi = require("joi");
const SendMail = require("../services/sendmail");
const mail_template = require("../Templates/register_template");

const UserDataValidation = Joi.object().keys({
  UserName: Joi.string().required().min(2).max(8),
  UserPhoneNumber: Joi.string()
    .required()
    .min(10)
    .max(10)
    .pattern(/^[6-9]{1}[0-9]{9}$/),
  UserEmailId: Joi.string().required().email(),
  UserRoleID: Joi.required(),
  Password: Joi.string().required().min(6).max(16),
});

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
        UserPhoneNumber: req.body.UserPhoneNumber,
      },
    });
    if (!user) return res.status(401).send("User Does Not Exist");
    // Check password is valid or not using bcrypt,compare function it require two parameters simple_password and hash_password
    const passwordValid = await bcrypt.compare(
      req.body.Password,
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
    let { error } = UserDataValidation.validate(req.body);

    const ExistUser = await Users.findOne({
      where: {
        UserPhoneNumber: req.body.UserPhoneNumber,
      },
    });
    if (error) {
      next({ error: { status: BAD_REQUEST, message: error.message } });
    } else if (ExistUser) {
      next({
        error: {
          status: SERVER_ERROR,
          detail: "This user is already registered please login",
        },
      });
    } else {
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
      })
        .then((result) => {
          res.locals.user = result;
          SendMail(
            res.locals.user.UserEmailId,
            mail_template(res.locals.user.UserName)
          );
          res.locals.SignupStatus = {
            isRegistered: true,
            Message: "You are registered successfully please login",
          };
          next(); 
        })
        .catch((error) => {
          next({ status: SERVER_ERROR, Message: "server error" });
        });
    }
  } catch (error) {
    next({ status: SERVER_ERROR, message: error });
  }
};

const SendRegistrationMail = async (req, res, next) => {
  try {
    const sendmail = SendMail(
      res.locals.user.UserEmailId,
      mail_template(res.locals.use.UserName)
    );
    next();
  } catch (error) {
    next({ status: SERVER_ERROR, message: error });
  }
};

module.exports = {
  GetUsers,
  getUserByContactNo,
  AddUser,
  SendRegistrationMail,
};
