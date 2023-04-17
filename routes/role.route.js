const router = require("express").Router();

const RoleRoute = router;
const Rolecontroller = require("../controllers/roles.controller");
const Roles = require("../models/role");

// Basic Crud Routing.

RoleRoute.get("/Roles",Rolecontroller.GetRoles, async (req, res) => {
  res.status(200).send(res.locals.results);
});


RoleRoute.post("/Roles",Rolecontroller.AddRoles, async (req, res) => {
  res.status(200).send(res.locals.AddedRoles);
});


RoleRoute.put("/Roles",Rolecontroller.UpdateRoles, async (req, res) => {
  res.status(200).send(res.locals.UpdatedRole);
});


RoleRoute.delete("/Roles",Rolecontroller.DeleteRoles, async (req, res) => {
  res.status(200).send(res.locals.DeletedRoles);
});

module.exports = RoleRoute;
  