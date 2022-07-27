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
  console.log(email);
  if (existe) {
    throw new Error(`El email ${email} esta registrado en la DB`);
  }
};

module.exports = {
  isValidateRole,
  emailExiste,
};
