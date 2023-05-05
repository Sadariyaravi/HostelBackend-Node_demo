const Roles = require("../models/role");
const { SERVER_ERROR, BAD_REQUEST } = require("../enums/error");
const Joi = require("joi");

const RoleValidation = Joi.object().keys({
  Role: Joi.string().required(),
});

const GetRoles = async (req, res, next) => {
  try {
    Roles.findAll().then((result) => {
      res.locals.results = result;
      next();
    });
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const AddRoles = async (req, res, next) => {
  console.log(req.body);
  try {
    let error = RoleValidation.validate();

    if (error) {
      next({ error: { status: BAD_REQUEST, message: error } });
    } else {
      Roles.create(req.body).then((AddedRoles) => {
        res.locals.AddedRoles = AddedRoles;
      });
      next();
    }
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const UpdateRoles = async (req, res, next) => {
  try {
    Roles.update(req.body, {
      where: { id: req.query.id },
    });
    res.locals.UpdatedRole = `Role Id : ${req.query.id} Updated Successfully`;
    next();
  } catch (error) {
    console.log(error);
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};

const DeleteRoles = async (req, res, next) => {
  try {
    Roles.destroy({
      where: { id: req.query.id },
    });
    res.locals.DeletedRoles = `Role Id : ${req.query.id} Deleted Successfully`;
    next();
  } catch (error) {
    next({ error: { status: SERVER_ERROR, message: error } });
  }
};
module.exports = { GetRoles, AddRoles, UpdateRoles, DeleteRoles };
