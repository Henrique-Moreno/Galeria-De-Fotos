// Importando as bibliotecas necessárias
const { z } = require('zod'); // Para validações
const UserModel = require('../models/User'); // Importando o modelo de dados de usuário

// Definindo a classe UserService
class UserService {

  // Método para criar um novo usuário
  async createUser({ username, email, password }) {
    // Validação dos dados de entrada usando Zod
    const userSchema = z.object({
      username: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    // Validando os dados do usuário
    userSchema.parse({ username, email, password });

    // Chamando o método createUser do modelo UserModel para salvar o usuário
    return await UserModel.createUser({ username, email, password });
  }

  // Método para realizar o login de um usuário
  async login(email, password) {
    // Validação dos dados de entrada usando Zod
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    // Validando os dados de login
    loginSchema.parse({ email, password });

    // Buscando o usuário no banco de dados pelo email fornecido
    const user = await UserModel.findUserByEmail(email);

    // Verificando se o usuário não existe ou se a senha fornecida é inválida (aqui você pode implementar sua lógica de validação)
    if (!user || user.password !== password) {
      throw new Error('Credenciais inválidas');
    }

    // Retorna uma mensagem simples ao invés de um token (ou você pode implementar outra lógica)
    return { message: 'Login bem-sucedido' };
  }
}

// Exportando uma instância da classe UserService para uso em outras partes da aplicação
module.exports = new UserService();