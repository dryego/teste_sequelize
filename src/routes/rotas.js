const express = require("express");
const {
  usuarios,
  cadastroUsuario,
} = require("../controller/usuarioController");
const validarEsquemas = require("../middleware/validarSquemas");
const { schemaCadastro, schemaLogin } = require("../util/schemas");
const validarToken = require("../middleware/validarToken");
const fazerLogin = require("../controller/loginController");
const permicoesLogin = require("../middleware/permicaoLogin");
const permicoesAcesso = require("../middleware/permicoesAcesso");
const { tiposPermicoes } = require("../util/permicoes");

const rotas = express.Router();

rotas.post("/login", validarEsquemas(schemaLogin), permicoesLogin, fazerLogin);

rotas.use(validarToken);

rotas.get("/usuarios", usuarios);
rotas.post(
  "/usuario/cadastro",
  validarEsquemas(schemaCadastro),
  permicoesAcesso([tiposPermicoes.ADMIN]),
  cadastroUsuario
);

module.exports = rotas;
