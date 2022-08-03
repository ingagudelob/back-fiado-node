const { request, response } = require("express");

const validatorAdminRole = (req = request, res = response, next) => {
  if (!req.userAuth) {
    return res.status(500).json({
      msg: "Se requiere verificar el role sin validar el token",
    });
  }

  const { role, firstName } = req.userAuth;
  if (role != "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El usuario ${firstName} NO tiene persmisos suficientes`,
    });
  }
  next();
};

const existingRole = (...roles) => {
  return (req = request, res = response, next) => {
    const { role } = req.userAuth;

    if (!req.userAuth) {
      return res.status(500).json({
        msg: "Se requiere verificar el role sin validar el token",
      });
    }

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `Se requiere uno de estos roles ${roles}`,
      });
      next();
    }
  };
};

// Se llama en el user.controller asi: existingRole('ADMIN_ROLE', 'SHOP_ROLE')

module.exports = {
  validatorAdminRole,
  existingRole,
};
