// Importa o modelo PhotoModel, que será usado para interagir com o banco de dados
const PhotoModel = require('../models/Photo');

class PhotoService {
  // Método para criar uma nova foto
  // Recebe um objeto com as propriedades title, url e userId
  async createPhoto({ title, url, userId }) {
    // Chama o método createPhoto do modelo PhotoModel para salvar a foto no banco de dados
    return await PhotoModel.createPhoto({ title, url, userId });
  }

  // Método para recuperar todas as fotos
  async getPhotos() {
    // Chama o método getPhotos do modelo PhotoModel para buscar todas as fotos no banco de dados
    return await PhotoModel.getPhotos();
  }

  // Método para buscar uma foto pelo ID
  async getPhotoById(id) {
    // Converte o ID para número (caso seja enviado como string) e chama o método getPhotoById do modelo PhotoModel
    return await PhotoModel.getPhotoById(Number(id));
  }

  // Método para atualizar os dados de uma foto específica
  // Recebe o ID da foto e um objeto contendo os novos dados
  async updatePhoto(id, data) {
    // Converte o ID para número e chama o método updatePhoto do modelo PhotoModel para atualizar a foto
    return await PhotoModel.updatePhoto(Number(id), data);
  }

  // Método para deletar uma foto pelo ID
  async deletePhoto(id) {
    // Converte o ID para número e chama o método deletePhoto do modelo PhotoModel para remover a foto
    return await PhotoModel.deletePhoto(Number(id));
  }
}

// Exporta uma instância da classe PhotoService para que possa ser utilizada em outras partes do projeto
module.exports = new PhotoService();
