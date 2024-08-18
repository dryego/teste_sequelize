const Usuario = require("../model/usuario");

const buscarUsuarioEmail = async (email) => {
  const usuario = await Usuario.findOne({
    where: {
      email: email,
    },
  });

  return usuario;
};

module.exports = {
  buscarUsuarioEmail,
};
