const validarEsquemas =
  (joiEsquema, local = "body") =>
  async (req, res, next) => {
    try {
      await joiEsquema.validateAsync(req[local], { abortEarly: false });
      next();
    } catch (error) {
      const detalhes = error.details
        ? error.details.map((detail) => detail.message)
        : [error.message];

      console.error("Erro de validação:", detalhes);

      return res.status(400).json({
        mensagem: "Erro de validação",
        erros: detalhes,
      });
    }
  };

module.exports = validarEsquemas;
