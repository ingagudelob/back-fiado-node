const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

//? Metodo get - Para obtener los datos del usuario
const getUser = async (req = request, res = response) => {
  // 403 - Llamada iliegal sin token
  // http://localhost:8080/api/user?nombre=jaime&edad=36&id=101

  const { limite = 10, desde = 0 } = req.query;

  //! Con esta logica, pudo ahcer las dos promesas simultaneas a traves del Promise
  //! me reduce el tiempo de respuesta
  const [length, usersData] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(desde).limit(limite),
  ]);

  res.json({ length, usersData });
};

//? Metodo POST - Para obtener los datos del usuario

const postUser = async (req = request, res = response) => {
  const body = req.body;

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

//? Metodo para actualizar un usuario

const putUser = async (req = request, res) => {
  const { id } = req.params;

  // discrimino las variables, si vienen
  const { password, google, email, _id, dni, ...resto } = req.body;

  // TODO: Validar contra base de datos
  if (password) {
    // Encriptar contrañesa, salt = 10 por defecto
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);
  }

  const userUpdate = await User.findByIdAndUpdate(id, resto);

  res.json({
    msg: `se ha actualizado correctamente - ID: ${id}`,
    userUpdate,
  });
};

const deleteUserOnce = async (req = request, res) => {
  const { id } = req.params;
  // 403 - Llamada iliegal sin token

  // Borrado fisicamente
  // const userDelete = await User.findByIdAndDelete(id);

  // Cambio de estado para no perder la referencia
  const userDelete = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    userDelete,
    msg: `delete user con ID: ${id}  - Controller`,
  });
};

const deleteUserAll = (req, res) => {
  // 403 - Llamada iliegal sin token
  res.json({
    ok: true,
    msg: "delete API - Controller",
  });
};

module.exports = {
  getUser,
  postUser,
  putUser,
  deleteUserAll,
  deleteUserOnce,
};

//* Cuantos registros tengo activos, Estados en true
// Envio un objeto con la condición
// const length = await User.countDocuments({ state: true });

//* Limites de paginacion de las colecciones y con estado activo (true)
// const usersData = await User.find({ state: true }).skip(desde).limit(limite);
