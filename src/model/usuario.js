// const { DataTypes, Model } = require("sequelize");
// const sequelize = require("../config/bancoDados");

// const Usuario = sequelize.define("usuario", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   nome: {
//     type: DataTypes.STRING(130),
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING(236),
//     allowNull: false,
//     unique: true,
//   },
//   ativo: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true,
//   },
//   permicoes: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// });

// module.exports = Usuario;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/bancoDados");

const Usuario = sequelize.define("usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(130),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(236),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  permicoes: {
    type: DataTypes.STRING(7),
    allowNull: false,
  },
});

module.exports = Usuario;
