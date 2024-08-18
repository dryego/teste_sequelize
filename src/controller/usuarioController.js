const Usuario = require("../model/usuario");
const {
  cadastroNovoUsuario,
  listaUsuarios,
} = require("../service/usuarioService");

const usuarios = async (req, res) => {
  try {
    const usuarios = await listaUsuarios();
    if (usuarios.sucesso === false) {
      return res.status(404).json({ mensagen: usuarios.error });
    }
    return res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno: " + error });
  }
};

const cadastroUsuario = async (req, res) => {
  const { nome, email, senha, permicoes } = req.body;
  try {
    const novoUsuario = await cadastroNovoUsuario(
      nome,
      email,
      senha,
      permicoes
    );

    if (novoUsuario.successo === false) {
      return res.status(404).json({ mensagen: novoUsuario.error });
    }

    return res
      .status(201)
      .json({ mensagen: "Usuario cadastrado com secesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno: " + error });
  }
};

module.exports = {
  usuarios,
  cadastroUsuario,
};
