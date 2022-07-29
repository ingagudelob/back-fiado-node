const express = require("express");
const cors = require("cors");
const router = require("../routes/user.router");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    this.authPath = "/api/auth";

    // Connection BD
    this.conectarDb();

    // Middleware
    this.middleware();

    // Rutas de mi aplicaión
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middleware() {
    // Cors
    this.app.use(cors());

    // Lectura y parseo del body a JSON
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    // utilizo el middleware de cors
    this.app.use(this.authPath, require("../routes/auth.router"));
    this.app.use(this.userPath, require("../routes/user.router"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en ${this.port}`);
    });
  }
}

module.exports = Server;
