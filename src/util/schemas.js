const Joi = require("joi");

const schemaCadastro = Joi.object({
  nome: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  senha: Joi.string().min(4).required(),
  permicoes: Joi.number().min(0).max(3).required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": " O campo email não é valido.",
    "any.required": " O campo email é obrigatório",
    "string.empty": "O campo email não pode esta vazio.",
  }),
  senha: Joi.string().min(4).required().messages({
    "any.required": " O campo senha é obrigatório.",
    "string.min": " Senha tem que ter no minimo 4 caracter.",
    "string.empty": "O campo senha não pode esta vazio.",
  }),
});

module.exports = {
  schemaCadastro,
  schemaLogin,
};
