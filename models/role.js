// Schema para manejar la collection de roles

// const ROLES = ["ADMIN_ROLE", "CLIENT_ROLE", "SHOP_ROLE"];

// module.exports = ROLES;

const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
