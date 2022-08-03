const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar.jwt");

const loginController = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //? Verificar si el correo existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Incorrect User / Password - Email",
      });
    }

    //? Verificar si el Usuario está activo
    if (!user.state) {
      return res.status(400).json({
        msg: "Incorrect User / Password - status: disabled",
      });
    }
    //? Verificar la contraseña
    const passValited = bcryptjs.compareSync(password, user.password);
    if (!passValited) {
      return res.status(400).json({
        msg: "Incorrect User / Password - Password",
      });
    }

    //? Generar el JWT (JSON Web Token) definida en los Helpers
    const token = await generarJWT(user.id);

    //? Respuesta positiva
    res.json({
      user,
      token,
      msg: "Login OK",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

module.exports = { loginController };
