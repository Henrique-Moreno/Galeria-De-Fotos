// Importando as bibliotecas necessárias
const bcrypt = require('bcrypt'); // Para criptografar senhas
const jwt = require('jsonwebtoken'); // Para gerar tokens JWT
const UserModel = require('../models/User'); // Importando o modelo de dados de usuário

// Definindo a classe UserService
class UserService {

  // Método para criar um novo usuário
  async createUser({ username, email, password }) {
    // Criptografando a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Chamando o método createUser do modelo UserModel para salvar o usuário com a senha criptografada
    return await UserModel.createUser({ username, email, password: hashedPassword });
  }

  // Método para realizar o login de um usuário
  async login(email, password) {
    // Buscando o usuário no banco de dados pelo email fornecido
    const user = await UserModel.findUserByEmail(email);

    // Verificando se o usuário não existe ou se a senha fornecida não corresponde à senha criptografada no banco de dados
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Se as credenciais estiverem incorretas, lança um erro
      throw new Error('Credenciais inválidas');
    }

    // Se as credenciais estiverem corretas, gerando um token JWT para autenticar o usuário
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secreta', { expiresIn: '1h' });

    // Retorna o token gerado
    return token;
  }
}

// Exportando uma instância da classe UserService para uso em outras partes da aplicação
module.exports = new UserService();
