const fazerLogin = require("../controller/loginController");
const login = require("../service/loginService");

jest.mock("../service/loginService");

describe("fazerLogin Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "usuario@teste.com",
        senha: "senha123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("deve retornar os dados do usuário e o token em caso de login bem-sucedido", async () => {
    const mockLoginResponse = {
      sucesso: true,
      data: {
        dataValues: {
          id: 1,
          nome: "Usuário Teste",
          email: "usuario@teste.com",
          permicoes: ["admin"],
        },
      },
      token: "fake-jwt-token",
    };

    login.mockResolvedValue(mockLoginResponse);

    await fazerLogin(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nome: "Usuário Teste",
      email: "usuario@teste.com",
      permicoes: ["admin"],
      token: "fake-jwt-token",
    });
  });

  it("deve retornar 404 e mensagem de erro em caso de falha no login", async () => {
    const mockLoginResponse = {
      sucesso: false,
      error: "Credenciais inválidas",
    };

    login.mockResolvedValue(mockLoginResponse);

    await fazerLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      menssagen: "Credenciais inválidas",
    });
  });

  it("deve retornar 500 e uma mensagem de erro em caso de exceção", async () => {
    login.mockRejectedValue(new Error("Erro no servidor"));

    await fazerLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      mensagem: "Erro interno: Error: Erro no servidor",
    });
  });
});
