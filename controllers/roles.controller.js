const Roles = require("../models/role");
const { SERVER_ERROR } = require("../enums/error");

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
    Roles.create(req.body).then((AddedRoles) => {
      res.locals.AddedRoles = AddedRoles;
    });
    next();
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
