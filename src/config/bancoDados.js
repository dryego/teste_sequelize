const { Sequelize } = require("sequelize");
const { dbSequelize } = require("./variaveisAmbiente");

const sequelize = new Sequelize("teste_sequelize", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
