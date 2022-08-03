const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  firstName: {
    type: String,
    required: [true, "Es un campo obligatorio"],
  },
  lastName: {
    type: String,
    required: [true, "Es un campo obligatorio"],
  },
  company_name: {
    type: String,
  },
  dni: {
    type: String,
    required: [true, " DNI - Es un campo obligatorio"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "eMail - Es un campo obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password - Es un campo obligatorio"],
  },
  adress: {
    type: String,
    required: [true, "Dirección - Es un campo obligatorio"],
  },
  city: {
    type: String,
    required: [true, "Ciudad - Es un campo obligatorio"],
  },
  country: {
    type: String,
    required: [true, "Pais - Es un campo obligatorio"],
  },
  role: {
    type: String,
    required: [true, "Rol - Es un campo obligatorio"],
    enum: ["ADMIN_ROLE", "SHOP_ROLE", "CLIENT_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

// ! Redfinir Metodo toString para no retornar la version y la contraseña
UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

// ? model() => Nombre de la collection
module.exports = model("Users", UserSchema);
