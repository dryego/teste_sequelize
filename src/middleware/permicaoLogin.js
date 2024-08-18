const { buscarUsuarioEmail } = require("../util/buscas");

const permicoesLogin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const usuario = await buscarUsuarioEmail(email);

    if (usuario === null || usuario.ativo === false) {
      return res.status(404).json({
        menssagen: "Você não tem permissão para acessar este serviço.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};

module.exports = permicoesLogin;
