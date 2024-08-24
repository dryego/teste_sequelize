const Usuario = require("../model/usuario");
const { buscarUsuarioEmail } = require("../util/buscas");

jest.mock("../model/usuario");

describe("buscarUsuarioEmail", () => {
  it("deve buscar um usuário pelo email", async () => {
    // Arrange
    const mockUsuario = {
      id: 1,
      nome: "John Doe",
      email: "johndoe@example.com",
    };
    Usuario.findOne.mockResolvedValue(mockUsuario);

    const email = "johndoe@example.com";

    // Act
    const usuario = await buscarUsuarioEmail(email);

    // Assert
    expect(usuario).toEqual(mockUsuario);
  });

  it("deve retornar null quando não encontrar usuário", async () => {
    // Arrange
    Usuario.findOne.mockResolvedValue(null);

    const email = "inexistente@example.com";

    // Act
    const usuario = await buscarUsuarioEmail(email);

    // Assert
    expect(usuario).toBeNull();
  });
});
