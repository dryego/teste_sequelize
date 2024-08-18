const loginService = require("../service/loginService");

const fazerLogin = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const login = await loginService(email, senha);

    if (login.sucesso === false) {
      return res.status(404).json({ menssagen: login.error });
    }

    const usuarioLogado = login.data;

    const usuario = usuarioLogado.dataValues;

    const mostraUsuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      permicoes: usuario.permicoes,
      token: login.token,
    };

    return res.json(mostraUsuario);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno: " + error });
  }
};

module.exports = fazerLogin;
