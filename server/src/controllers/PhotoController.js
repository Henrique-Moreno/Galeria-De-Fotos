// Importa o serviço de fotos, que contém as operações relacionadas à manipulação de fotos no banco de dados
const PhotoService = require('../services/PhotoService');

class PhotoController {
  // Método para criar uma nova foto
  async createPhoto(req, res) {
    const { title, url, userId } = req.body; // Extrai os dados da requisição (título, URL e ID do usuário)

    try {
      // Chama o serviço para criar uma nova foto no banco de dados
      const newPhoto = await PhotoService.createPhoto({ title, url, userId });
      // Retorna a nova foto criada com o status HTTP 201 (Criado)
      res.status(201).json(newPhoto);
    } catch (error) {
      // Loga o erro no console e retorna uma mensagem de erro com status HTTP 500 (Erro Interno do Servidor)
      console.error('Erro ao criar foto:', error); 
      res.status(500).json({ error: 'Erro ao criar foto' });
    }
  }

  // Método para buscar todas as fotos
  async getPhotos(req, res) {
    try {
      // Chama o serviço para buscar todas as fotos no banco de dados
      const photos = await PhotoService.getPhotos();
      // Retorna as fotos com o status HTTP 200 (Sucesso)
      res.status(200).json(photos);
    } catch (error) {
      // Loga o erro no console e retorna uma mensagem de erro com status HTTP 500 (Erro Interno do Servidor)
      console.error('Erro ao buscar fotos:', error);
      res.status(500).json({ error: 'Erro ao buscar fotos' });
    }
  }

  // Método para buscar uma foto pelo ID
  async getPhotoById(req, res) {
    const { id } = req.params; // Extrai o ID da foto dos parâmetros da rota

    try {
      // Chama o serviço para buscar a foto no banco de dados pelo ID (convertido para número)
      const photo = await PhotoService.getPhotoById(Number(id));
      // Se a foto não for encontrada, retorna um erro com status HTTP 404 (Não Encontrado)
      if (!photo) return res.status(404).json({ error: 'Foto não encontrada' });
      // Retorna a foto encontrada com o status HTTP 200 (Sucesso)
      res.status(200).json(photo);
    } catch (error) {
      // Loga o erro no console e retorna uma mensagem de erro com status HTTP 500 (Erro Interno do Servidor)
      console.error('Erro ao buscar foto:', error);
      res.status(500).json({ error: 'Erro ao buscar foto' });
    }
  }

  // Método para atualizar uma foto
  async updatePhoto(req, res) {
    const { id } = req.params; // Extrai o ID da foto dos parâmetros da rota
    const { title, url } = req.body; // Extrai os dados de atualização do corpo da requisição

    try {
      // Chama o serviço para atualizar a foto no banco de dados pelo ID (convertido para número)
      const updatedPhoto = await PhotoService.updatePhoto(Number(id), { title, url });
      // Se a foto não for encontrada, retorna um erro com status HTTP 404 (Não Encontrado)
      if (!updatedPhoto) return res.status(404).json({ error: 'Foto não encontrada' });
      // Retorna a foto atualizada com o status HTTP 200 (Sucesso)
      res.status(200).json(updatedPhoto);
    } catch (error) {
      // Loga o erro no console e retorna uma mensagem de erro com status HTTP 500 (Erro Interno do Servidor)
      console.error('Erro ao atualizar foto:', error); 
      res.status(500).json({ error: 'Erro ao atualizar foto' });
    }
  }

  // Método para deletar uma foto
  async deletePhoto(req, res) {
    const { id } = req.params; // Extrai o ID da foto dos parâmetros da rota

    try {
      // Chama o serviço para deletar a foto no banco de dados pelo ID (convertido para número)
      await PhotoService.deletePhoto(Number(id));
      // Retorna uma resposta sem conteúdo (status HTTP 204 - Sem Conteúdo)
      res.status(204).json({ message: 'Foto deletada com sucesso.' });
    } catch (error) {
      // Loga o erro no console e retorna uma mensagem de erro com status HTTP 500 (Erro Interno do Servidor)
      console.error('Erro ao deletar foto:', error); 
      res.status(500).json({ error: 'Erro ao deletar foto' });
    }
  }
}

// Exporta a instância do controlador de fotos para ser usado em outras partes do projeto
module.exports = new PhotoController();
