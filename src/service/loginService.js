const { buscarUsuarioEmail } = require("../util/buscas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");
const { senhaJWT } = require("../config/variaveisAmbiente");

const login = async (email, senha) => {
  try {
    const usuario = await buscarUsuarioEmail(email);
    if (!usuario) {
      throw new Error("Email ou senha invalidos.");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Senha invalida.");
    }

    const token = jwt.sign({ id: usuario.id }, senhaJWT, {
      expiresIn: "12h",
    });

    const { senha: _, ...detalheUsuario } = usuario;

    return { sucesso: true, data: detalheUsuario, token };
  } catch (error) {
    return { sucesso: false, error: error.message };
  }
};

module.exports = login;
