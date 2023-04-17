const {UNAUTHORIZED} = require("../enums/error")

const authorizeRole = (rolesArray) => (req, res, next) => {
  const authorized = rolesArray.includes(res.locals.tokendata.role);

  if (authorized) {
    return next();
  }

  next({ error: { status: UNAUTHORIZED, message: "Unauthorized Access" } });
};

module.exports = authorizeRole;
