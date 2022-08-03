const { Router } = require("express");
const { check } = require("express-validator");
const { loginController } = require("../controllers/auth.controller");
const { emailNoExiste } = require("../helpers/db.validators");
const { validarCampos } = require("../middlewares/validator.middleware");

// Llamamos la funcion Router
const router = Router();

router.post(
  "/login",
  [
    check("email", "El formato del correo no es valido").isEmail(),
    // check("role", "No es un role permitido").isIn(ROLES), // NO vacio
    check("email").custom(emailNoExiste),
    check(
      "password",
      "La contraseña es obligatoria y mayor a 6 caracteres"
    ).isLength({ min: 6 }), // NO vacio
    validarCampos,
  ],

  loginController
);

module.exports = router;
