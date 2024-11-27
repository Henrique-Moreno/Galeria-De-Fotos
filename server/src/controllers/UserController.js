// Importa o serviço de usuário, que contém a lógica de negócios para manipular usuários.
const UserService = require('../services/UserService');

// Define a classe UserController, responsável por lidar com as requisições relacionadas a usuários.
class UserController {
  // Método para criar um novo usuário.
  async createUser(req, res) {
    // Extrai os dados fornecidos no corpo da requisição (username, email e password).
    const { username, email, password } = req.body;

    try {
      // Chama o método createUser do UserService para criar um novo usuário com os dados fornecidos.
      const newUser = await UserService.createUser({ username, email, password });

      // Retorna o usuário criado com o status 201 (Criado).
      res.status(201).json(newUser);
    } catch (error) {
      // Caso ocorra um erro, retorna uma mensagem de erro com o status 500 (Erro interno do servidor).
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  // Método para autenticar o login do usuário.
  async login(req, res) {
    // Extrai o email e a senha fornecidos no corpo da requisição.
    const { email, password } = req.body;

    try {
      // Chama o método login do UserService para verificar as credenciais e obter um token de autenticação.
      const token = await UserService.login(email, password);

      // Retorna o token de autenticação com o status 200 (Sucesso).
      res.status(200).json({ token });
    } catch (error) {
      // Caso as credenciais sejam inválidas ou outro erro ocorra, retorna uma mensagem de erro com o status 401 (Não autorizado).
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  }
}

// Exporta uma instância da classe UserController, permitindo que outros módulos a utilizem.
module.exports = new UserController();
