// Importa o PrismaClient, que é utilizado para interagir com o banco de dados.
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do PrismaClient para usar nos métodos do modelo.
const prisma = new PrismaClient();

// Define a classe PhotoModel, responsável por gerenciar as operações de CRUD relacionadas ao modelo "photo" no banco de dados.
class PhotoModel {
  // Método para criar uma nova entrada de foto no banco de dados.
  // Recebe os dados da foto como argumento e os salva no banco.
  async createPhoto(data) {
    return await prisma.photo.create({ data });
  }

  // Método para obter todas as fotos armazenadas no banco de dados.
  async getPhotos() {
    return await prisma.photo.findMany();
  }

  // Método para obter uma única foto com base no ID.
  // Converte o ID para número para evitar inconsistências e busca no banco de dados.
  async getPhotoById(id) {
    return await prisma.photo.findUnique({
      where: { id: Number(id) }, // Certifique-se de converter para número
    });
  }

  // Método para atualizar uma foto existente no banco de dados.
  // Recebe o ID da foto e os dados atualizados.
  async updatePhoto(id, data) {
    return await prisma.photo.update({
      where: { id: Number(id) }, // Certifique-se de converter para número
      data,
    });
  }

  // Método para deletar uma foto existente no banco de dados.
  // Recebe o ID da foto e remove a entrada correspondente.
  async deletePhoto(id) {
    return await prisma.photo.delete({
      where: { id: Number(id) }, // Certifique-se de converter para número
    });
  }
}

// Exporta uma instância da classe PhotoModel, permitindo que ela seja usada em outras partes do projeto.
module.exports = new PhotoModel();
