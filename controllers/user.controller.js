const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

// Metofo get
const getUser = (req = request, res = response) => {
  // 403 - Llamada iliegal sin token
  // http://localhost:8080/api/user?nombre=jaime&edad=36&id=101

  const { nombre = "No Name", edad, id, page = "1", limit } = req.query;

  res.json({
    msg: "get API - Controller",
    nombre,
    edad,
    id,
    page,
    limit,
  });
};

const postUser = async (req = request, res = response) => {
  const body = req.body;
  const { email } = body;

  // Crea la instancia preparandola para enviarla al repositorio.
  const user = new User(body);

  // Encriptar contrañesa, salt = 10 por defecto
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(body.password, salt);

  // Envio al repositorio
  await user.save();

  res.status(201).json({
    msg: `Se ha creado el usuario == ${user.firstName} == correctamente`,
    user,
  });
};

const putUser = (req, res) => {
  // 403 - Llamada iliegal sin token
  res.json({
    ok: true,
    msg: "se ha actualizado correctamente - Controller",
  });
};

const deleteUserAll = (req, res) => {
  // 403 - Llamada iliegal sin token
  res.json({
    ok: true,
    msg: "delete API - Controller",
  });
};

const deleteUserOnce = (req = request, res) => {
  const id = req.params.id;
  // 403 - Llamada iliegal sin token
  res.json({
    ok: true,
    msg: `delete user con ID: ${id}  - Controller`,
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUserAll,
  deleteUserOnce,
};
