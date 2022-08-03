const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const User = require("../models/user");

const validatorJWT = async (req = request, res = response, netx) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      msg: "No token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // Creo una nueva propiedad en la request para tratarla en el controlador
    req.uid = uid;

    const userAuth = await User.findById(uid);

    // Verificar si el usuario no existe en la BD
    if (!userAuth) {
      return res.status(401).json({
        msg: "Invalid Token - El usuario no existe en BD",
      });
    }

    // Verificar si el usuario no esta dado de baja
    // if (userAuth.role != "ADMIN_ROLE") {
    //   return res.status(401).json({
    //     msg: "No tiene persmisos suficientes",
    //   });
    // }

    // Verificar si el usuario no esta dado de baja
    if (!userAuth.state) {
      return res.status(401).json({
        msg: "El usuario se encuentra desactivado",
      });
    }

    req.userAuth = userAuth;
    netx();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = validatorJWT;
