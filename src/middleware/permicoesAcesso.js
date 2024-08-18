const autorizar = (permissoesPermitidas) => {
  return (req, res, next) => {
    try {
      const usuario = req.usuario.dataValues;

      if (!usuario || !permissoesPermitidas.includes(usuario.permicoes)) {
        return res
          .status(403)
          .json({ mensagem: "Acesso negado: permissão insuficiente." });
      }

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro na autorização", error: error.message });
    }
  };
};

module.exports = autorizar;
