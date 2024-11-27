// Importa a classe PrismaClient da biblioteca @prisma/client, que é usada para interagir com o banco de dados
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do PrismaClient para realizar operações no banco de dados
const prisma = new PrismaClient();

// Define a classe UserModel, que contém métodos para gerenciar usuários no banco de dados
class UserModel {
  // Método assíncrono para criar um novo usuário no banco de dados
  async createUser(data) {
    // Usa o método create do Prisma para inserir os dados fornecidos na tabela "user"
    return await prisma.user.create({ data });
  }

  // Método assíncrono para encontrar um usuário pelo email no banco de dados
  async findUserByEmail(email) {
    // Usa o método findUnique do Prisma para buscar um registro único na tabela "user" pelo campo "email"
    return await prisma.user.findUnique({ where: { email } });
  }
}

// Exporta uma instância da classe UserModel para que outros módulos possam utilizá-la
module.exports = new UserModel();
