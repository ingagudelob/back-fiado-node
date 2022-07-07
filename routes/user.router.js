// ? Aca definimos la funcion Router desde express

const { Router } = require("express");
const {
  getUser,
  postUser,
  putUser,
  deleteUserAll,
  deleteUserOnce,
} = require("../controllers/user.controller");

// Llamamos la funcion Router
const router = Router();

// Realizao la peticion llamando al controlador
router.get("/", getUser);

router.post("/", postUser);

router.put("/", putUser);

router.delete("/", deleteUserAll);

router.delete("/:id", deleteUserOnce);

module.exports = router;
