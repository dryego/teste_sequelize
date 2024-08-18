const jwt = require("jsonwebtoken");
const { senhaJWT } = require("../config/variaveisAmbiente");
const Usuario = require("../model/usuario");

const validarToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const { id } = jwt.verify(token, senhaJWT);

    const dadosUsuario = await Usuario.findOne({
      where: {
        id: id,
      },
    });

    if (!dadosUsuario) {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    const { senha_, ...usuario } = dadosUsuario;
    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(500).json({ menssagem: "Erro interno: " + error });
  }
};

module.exports = validarToken;
