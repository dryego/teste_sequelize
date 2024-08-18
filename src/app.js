const express = require("express");
const rotas = require("./routes/rotas");
const bancoDados = require("./config/bancoDados");
const { porta } = require("./config/variaveisAmbiente");

const app = express();

app.use(express.json());
app.use(rotas);

bancoDados
  .sync({ force: false })
  .then(() => console.log("Banco de dados conectado e sincronizado"));
app.listen(porta, console.log("Servidor inicializado."));
