const Usuario = require("../model/usuario");
const { buscarUsuarioEmail } = require("../util/buscas");
const bcrypt = require("bcrypt");
const { tiposPermicoes } = require("../util/permicoes");

const listaUsuarios = async () => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      throw new Error("Não à usuarios cadastrado.");
    }

    return { sucesso: true, data: usuarios };
  } catch (error) {
    return { sucesso: false, error: error.message };
  }
};

const cadastroNovoUsuario = async (nome, email, senha, permicoes) => {
  try {
    const usuarioCadastrado = await buscarUsuarioEmail(email);
    if (usuarioCadastrado !== null) {
      throw new Error("Usuario já cadastrado.");
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    if (!Object.values(tiposPermicoes).includes(permicoes)) {
      throw new Error(
        `Permissão inválida. As permissões válidas são: ${tiposPermicoes.ADMIN}, ${tiposPermicoes.USUARIO}, ${tiposPermicoes.CLIENTE}.`
      );
    }
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      permicoes,
    });

    return { sucesso: true, data: novoUsuario };
  } catch (error) {
    return { successo: false, error: error.message };
  }
};

module.exports = {
  cadastroNovoUsuario,
  listaUsuarios,
};
