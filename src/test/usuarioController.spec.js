const {
  usuarios,
  cadastroUsuario,
} = require("../controller/usuarioController");
const {
  listaUsuarios,
  cadastroNovoUsuario,
} = require("../service/usuarioService");

jest.mock("../service/usuarioService");

describe("Usuario Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        nome: "Usuário Teste",
        email: "usuario@teste.com",
        senha: "senha123",
        permicoes: ["user"],
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("usuarios", () => {
    it("deve retornar a lista de usuários em caso de sucesso", async () => {
      const mockUsuariosResponse = {
        sucesso: true,
        data: [
          { id: 1, nome: "Usuário 1", email: "usuario1@teste.com" },
          { id: 2, nome: "Usuário 2", email: "usuario2@teste.com" },
        ],
      };

      listaUsuarios.mockResolvedValue(mockUsuariosResponse);

      await usuarios(req, res);

      expect(res.json).toHaveBeenCalledWith(mockUsuariosResponse);
    });

    it("deve retornar 404 e uma mensagem de erro em caso de falha", async () => {
      const mockErrorResponse = {
        sucesso: false,
        error: "Nenhum usuário encontrado",
      };

      listaUsuarios.mockResolvedValue(mockErrorResponse);

      await usuarios(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        mensagen: "Nenhum usuário encontrado",
      });
    });

    it("deve retornar 500 em caso de exceção", async () => {
      listaUsuarios.mockRejectedValue(new Error("Erro ao listar usuários"));

      await usuarios(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: "Erro interno: Error: Erro ao listar usuários",
      });
    });
  });

  describe("cadastroUsuario", () => {
    it("deve cadastrar um novo usuário e retornar 201 em caso de sucesso", async () => {
      const mockCadastroResponse = {
        sucesso: true,
        data: { id: 1, nome: "Usuário Teste", email: "usuario@teste.com" },
      };

      cadastroNovoUsuario.mockResolvedValue(mockCadastroResponse);

      await cadastroUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        mensagen: "Usuario cadastrado com secesso!",
      });
    });

    it("deve retornar 404 e uma mensagem de erro em caso de falha no cadastro", async () => {
      const mockCadastroError = {
        sucesso: false,
        error: "Falha ao cadastrar usuário",
      };

      cadastroNovoUsuario.mockResolvedValue(mockCadastroError);

      await cadastroUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        mensagen: "Falha ao cadastrar usuário",
      });
    });

    it("deve retornar 500 em caso de exceção", async () => {
      cadastroNovoUsuario.mockRejectedValue(
        new Error("Erro ao cadastrar usuário")
      );

      await cadastroUsuario(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        mensagem: "Erro interno: Error: Erro ao cadastrar usuário",
      });
    });
  });
});
