require("dotenv").config();

module.exports = {
  porta: process.env.PORT,
  senhaJWT: process.env.SENHA_JWT,
  dbSequelize: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
