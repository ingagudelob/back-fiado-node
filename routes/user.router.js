// ? Aca definimos la funcion Router desde express
const { isValidateRole } = require("../helpers/db.validators");
const { validarCampos } = require("../middlewares/validator.middleware");
const { emailExiste, beUserById } = require("../helpers/db.validators");

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  postUser,
  putUser,
  deleteUserAll,
  deleteUserOnce,
} = require("../controllers/user.controller");
// const ROLES = require("../models/role");

// Llamamos la funcion Router
const router = Router();

// Realizao la peticion llamando al controlador
router.get("/", getUser);

router.post(
  "/",
  [
    check("dni", "La identificación es obligatoria").not().isEmpty(), // NO vacio
    check("firstName", "El nombre es obligatorio").not().isEmpty(), // NO vacio
    check("lastName", "El apellido es obligatorio").not().isEmpty(), // NO vacio
    check(
      "password",
      "La contraseña es obligatoria y mayor a 6 caracteres"
    ).isLength({ min: 6 }), // NO vacio
    check("email", "El formato del correo no es valido").isEmail(),
    // check("role", "No es un role permitido").isIn(ROLES), // NO vacio
    check("email").custom(emailExiste),
    check("role").custom(isValidateRole),
    validarCampos,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido para Mongo").isMongoId(),
    check("id").custom(beUserById),
    check("email").custom(emailExiste),
    validarCampos,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido para Mongo").isMongoId(),
    check("id").custom(beUserById),
    validarCampos,
  ],
  deleteUserOnce
);

router.delete("/", deleteUserAll);

module.exports = router;
