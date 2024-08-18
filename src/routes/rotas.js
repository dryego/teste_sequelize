const express = require("express");
const {
  usuarios,
  cadastroUsuario,
} = require("../controller/usuarioController");
const validarEsquemas = require("../middleware/validarSquemas");
const { schemaCadastro, schemaLogin } = require("../util/schemas");
const validarToken = require("../middleware/validarToken");
const login = require("../service/loginService");
const fazerLogin = require("../controller/loginController");
const permicoesLogin = require("../middleware/permicaoLogin");

const rotas = express.Router();

rotas.post("/login", validarEsquemas(schemaLogin),permicoesLogin, fazerLogin);

rotas.use(validarToken);

rotas.get("/usuarios", usuarios);
rotas.post(
  "/usuario/cadastro",
  validarEsquemas(schemaCadastro),
  cadastroUsuario
);

module.exports = rotas;
