const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //    useCreateIndex: true,
      //   useFindAndModify: false,
    });

    console.log("Base de datos ONLINE");
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectarse la base de datos");
  }
};

module.exports = {
  dbConnection,
};
