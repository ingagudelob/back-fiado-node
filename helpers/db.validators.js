const Role = require("../models/role");
const User = require("../models/user");

const isValidateRole = async (role = "") => {
  const existeRole = await Role.findOne({ role });
  if (!existeRole) {
    throw new Error(`EL rol ${role} no esta registrado en la DB`);
  }
};

const emailExiste = async (email = "") => {
  const existe = await User.findOne({ email });
  if (existe) {
    throw new Error(`El email ${email} esta registrado en la DB`);
  }
};

const emailNoExiste = async (email = "") => {
  const existe = await User.findOne({ email });
  if (!existe) {
    throw new Error(`El email ${email} no existe en la DB`);
  }
};

const beUserById = async (_id) => {
  const exists = await User.findById({ _id });
  if (!exists) {
    throw new Error(`El ID: ${_id} no existe en la DB`);
  }
};

module.exports = {
  isValidateRole,
  emailExiste,
  beUserById,
  emailNoExiste,
};
