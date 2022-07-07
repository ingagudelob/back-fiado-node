const { response, request } = require("express");

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

const postUser = (req = request, res) => {
  const body = req.body;

  res.status(201).json({
    msg: `Se ha creado el usuario == ${body.name} == correctamente`,
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
