Aplicação de Gerenciamento de Usuários

Esta é uma aplicação de gerenciamento de usuários desenvolvida em Node.js utilizando Express, Sequelize, e Joi. A aplicação permite o cadastro e listagem de usuários, bem como a autenticação via login.
Pré-requisitos

Antes de executar a aplicação, certifique-se de ter os seguintes componentes instalados:

   Node.js v22.3.0 ou superior
   npm v10.0.1 ou superior
   Banco de dados compatível com Sequelize (MySQL, PostgreSQL, SQLite, etc.)

Instalação

   Clone o repositório para sua máquina local:

bash
  $git clone https://github.com/dryego/teste_sequelize
  $cd seu-repositorio

Instale as dependências do projeto:

bash
  $npm install

Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e configure as seguintes variáveis:

makefile
  DB_HOST=localhost
  DB_USER=seu_usuario
  DB_PASS=sua_senha
  DB_NAME=nome_do_banco
  JWT_SECRET=seu_segredo_jwt

Configure o banco de dados:

Execute as migrações para configurar o banco de dados:

bash
  $npx sequelize db:migrate

Execução

Para iniciar a aplicação em ambiente de desenvolvimento, use o comando:

bash
  $npm run dev

A aplicação estará disponível em http://localhost:3000.

Testes

Para executar os testes unitários da aplicação, use o comando:

bash
  $npm run test

Estrutura do Projeto

    src/
        app.js: Arquivo principal que inicializa o servidor Express.
        controller/: Contém os controladores que manipulam as requisições.
        middleware/: Contém os middlewares para validação de esquemas e autenticação.
        model/: Contém os modelos Sequelize que representam as tabelas do banco de dados.
        service/: Contém a lógica de negócio da aplicação.
        test/: Contém os testes unitários.
        util/: Contém utilitários como esquemas de validação e definições de permissões.

Endpoints
Autenticação

    POST /login: Realiza o login do usuário.
        Body:

        json

        {
          "email": "usuario@teste.com",
          "senha": "senha123"
        }

Usuários

    GET /usuarios: Lista todos os usuários cadastrados. (Requer autenticação)
    POST /usuario/cadastro: Cadastra um novo usuário. (Requer autenticação e permissão de ADMIN)
        Body:

        json

        {
          "nome": "Usuário Teste",
          "email": "usuario@teste.com",
          "senha": "senha123",
          "permicoes": ["user"]
        }

Tecnologias Utilizadas

    Node.js: Ambiente de execução JavaScript server-side.
    Express: Framework web para Node.js.
    Sequelize: ORM para Node.js que suporta vários bancos de dados.
    Joi: Biblioteca para validação de esquemas de dados.
    JWT: Usado para autenticação via tokens.

Contribuição

Se você deseja contribuir com o projeto, siga os passos abaixo:

    Faça um fork do repositório.
    Crie uma nova branch (git checkout -b feature/sua-feature).
    Commit suas alterações (git commit -am 'Adiciona nova feature').
    Envie para a branch principal (git push origin feature/sua-feature).
    Crie um novo Pull Request.

Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
